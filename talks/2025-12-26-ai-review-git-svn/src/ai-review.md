# AI Review + Git/SVN 推行方案（Gitea）

## 0. 关键结论（PPT 首页用）
- 通过 Gitea hooks + AI Review 实现“提交质量门禁”，不合格 push 直接拒绝。
- 通过 post-receive 写入 `refs/ai-reviewed/<branch>` 作为“通过标记”，解决 pre-receive 不能写 refs 的限制。
- 本地使用 `scripts/push-with-svn` 实现 push 后自动 `git svn dcommit`，保留 SVN 作者为本人。
- 增加评分归一化逻辑，避免评分长期停留在 0/100 两极。

## 1. 背景与目标
- 公司 SVN 为主仓库，管理层偶尔查看 SVN 记录。
- 开发主流程仍是 Git，且希望尽量减少人工操作。
- 目标：
  - AI Review 自动校验提交质量，不合格直接拒绝 push。
  - Git push 成功后自动同步 SVN（git-svn）。
  - 保留 SVN 提交作者为本人（个人凭据本地执行 dcommit）。

## 2. 关键约束
- Gitea 的 pre-receive 在 quarantine 阶段不能写 refs/tag。
- Git 标准 hook 没有 post-push（只能靠封装脚本或 CI）。
- SVN `svn:author` 由提交账号决定，服务器统一账号会丢失作者信息。

## 3. 方案总览（端到端）
```
开发者 git psvn
  └─ git push
       └─ Gitea pre-receive: AI Review
             ├─ 不通过 -> 拒绝 push
             └─ 通过 -> 继续
       └─ Gitea post-receive: 写 refs/ai-reviewed/<branch>
       └─ Gitea post-receive: 飞书通知
  └─ 本地脚本检查 marker -> git svn rebase/dcommit
```

## 4. 组件与职责

### 4.1 服务器侧（Gitea）
- 路径：
  - `/path/to/gitea-repositories/<owner>/<repo>.git/hooks/pre-receive.d/10-ai-review`
  - `/path/to/gitea-repositories/<owner>/<repo>.git/hooks/post-receive.d/20-ai-review-mark-reviewed`
  - `/path/to/gitea-repositories/<owner>/<repo>.git/hooks/post-receive.d/25-ai-review-feishu-notify`
  - `/path/to/gitea-repositories/<owner>/<repo>.git/hooks/ai-review.env`

#### pre-receive: `10-ai-review`
- 对 diff 执行 AI Review（默认关注 `*.ts/*.tsx/*.js/*.jsx`）。
- 仅当明确问题（`CONFIRMED:`）才允许 `pass=false`。
- 需要“可核验证据”（文件+行号 或 diff 片段）。
- 评分优化：新增 `AI_REVIEW_SCORE_MODE`，在模型给出 0/100 时自动归一化。

#### post-receive: `20-ai-review-mark-reviewed`
- 对 `main/master/release*` 分支写 marker：
  - `refs/ai-reviewed/<branch> -> <newrev>`
- 只做标记，失败不影响 push。

#### post-receive: `25-ai-review-feishu-notify`
- 从 review 日志读取 `pass/score/reasons` 发飞书。
- 失败通知由 pre-receive 直接发送（因为失败 push 不触发 post-receive）。

### 4.2 开发者侧（本地）
- `scripts/push-with-svn`：封装 push + svn 同步。
- 推荐 alias：
```
git config --global alias.psvn '!./scripts/push-with-svn origin master:master'
```
- 使用方式：
```
git psvn
```
- 可选参数：
  - `REQUIRE_AI_REVIEW_MARKER=1`：没有 marker 不同步 SVN。
  - `RESET_TO_ORIGIN_AFTER_SVN=0`：不 reset 回远端。
  - `ALLOWED_BRANCHES_REGEX=^(main|master|release(/.*)?)$`

### 4.3 可选：服务器侧 git-svn（高级方案）
- 服务器维护一个非 bare 的 git-svn mirror 仓库。
- post-receive 触发 `git svn dcommit`，但作者会变成服务器账号。
- 适合“统一账号写 SVN”的团队，不适合要求保留个人作者的场景。

## 5. 评分与准入规则（核心机制）
- `CONFIRMED:` 明确问题，可拒绝 push。
- `RISK:` 仅风险或信息不足，默认放行（soft pass）。
- 证据要求：
  - `path/to/file.ts:123` 或 `path/to/file.ts#L123`
  - 直接引用 diff 片段：`...`
- `AI_REVIEW_SCORE_MODE`：
  - `auto`：仅当模型给 0/100 时归一化（默认）。
  - `normalize`：始终归一化。
  - `model`：完全信任模型评分。
- 评分归一化用于展示和通知，不改变 `pass` 判定。

## 6. 环境配置（ai-review.env）
- 服务器文件：`/path/to/gitea-repositories/<owner>/<repo>.git/hooks/ai-review.env`
- 示例（脱敏）：
```
AI_REVIEW_API_KEY=...
AI_REVIEW_API_URL=https://your-router.example/v1/chat/completions
AI_REVIEW_MODEL=kimi-k2-turbo-preview
AI_REVIEW_MIN_SCORE=0
AI_REVIEW_SCORE_MODE=auto
AI_REVIEW_TIMEOUT_SECONDS=60
AI_REVIEW_MAX_DIFF_BYTES=200000
AI_REVIEW_RESPONSE_FORMAT=json_object
AI_REVIEW_SHOW_REASONS_ON_PASS=1
AI_REVIEW_LOG_DIR=hooks/ai-review-logs
AI_REVIEW_LOG_ON_SKIP=1
AI_REVIEW_PATHSPECS='*.ts *.tsx *.js *.jsx'
AI_REVIEW_REQUIRE_CONFIRMED=1
AI_REVIEW_REQUIRE_EVIDENCE=1
AI_REVIEW_CONFIRM_PREFIX=CONFIRMED
AI_REVIEW_RISK_PREFIX=RISK
AI_REVIEW_FORCE_REGEX='\\[(ai-review:force|skip-ai-review|force-ai-review)\\]'
AI_REVIEW_ALLOW_FORCE=1
AI_REVIEW_MARK_NAMESPACE=refs/ai-reviewed
AI_REVIEW_MARK_BRANCH_ALLOW_REGEX='^(main|master|release(/.*)?)$'
FEISHU_WEBHOOK_URL=...
FEISHU_NOTIFY_ON_PASS=1
FEISHU_NOTIFY_ON_FAIL=1
FEISHU_NOTIFY_ON_FORCED=1
FEISHU_NOTIFY_ON_SOFT_PASS=1
FEISHU_TITLE_PREFIX='AI Review'
```

## 7. 开发者实际流程（建议口径）
- 只用 `git psvn` 推送主分支。
- push 成功代表 AI Review 通过。
- marker 检查通过后自动执行 `git svn rebase && git svn dcommit`。
- 若 push 失败，先看 AI Review 输出或飞书原因，再改代码。

## 8. 运维与可观测性
- Review 日志目录：`hooks/ai-review-logs`
- 每次 push 都会生成 JSON 日志，字段包含：
  - `review.score` / `review.score_raw` / `review.pass` / `review.reasons`
- 快速校验：
```
git ls-remote origin "refs/ai-reviewed/master"
```

## 9. 常见问题与处理
- AI Review 被跳过：
  - 无 JS/TS 变更、或 diff 过大，检查 `AI_REVIEW_LOG_ON_SKIP` 与 `AI_REVIEW_MAX_DIFF_BYTES`。
- 评分仍极端：
  - 设 `AI_REVIEW_SCORE_MODE=normalize`。
- marker 不写：
  - 确认 post-receive 脚本存在，检查分支正则 `AI_REVIEW_MARK_BRANCH_ALLOW_REGEX`。
- SVN 未同步：
  - 确认使用 `git psvn` 或本地 wrapper，且 marker 指向 HEAD。
- AI Review 失败但无原因：
  - 检查 API Key、超时、响应非 JSON。

## 10. 推行计划（团队落地）
- Phase 1：AiStudio 仓库试点，先观察告警和误报比例。
- Phase 2：规范“必须使用 git psvn”，并引入 Husky 或自定义 wrapper 提醒。
- Phase 3：把配置模板化，推广到更多仓库。
- Phase 4：持续优化评分策略和规则库。

## 11. 安全与合规
- AI Key、Feishu Webhook 只放在 `ai-review.env`，不提交到仓库。
- SVN 凭据保留在个人本地，避免服务器统一账号。
- 必要时启用最小权限 Token。

## 12. PPT 结构建议（直接可用）
- 1页：背景 & 痛点
- 1页：方案总览（流程图）
- 1页：核心机制（CONFIRMED/RISK + marker ref）
- 1页：落地效果 & 数据（拒绝率、耗时、节省成本）
- 1页：推行计划
