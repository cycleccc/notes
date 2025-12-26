---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: false
layout: center
glowSeed: 6
title: AI Review + Git/SVN 推行方案
exportFilename: AI-Review-Gitea-Hooks-Git-SVN-slidev-exported
monaco: true
---

<div class="text-5xl font-bold gradient-text mb-6">
AI Review + Git/SVN 推行方案
</div>

<div class="text-xl opacity-80 mb-10">
用 <span class="font-mono">Gitea hooks</span> 做提交质量门禁，用 <span class="font-mono">refs/ai-reviewed/*</span> 解决“通过标记”，再无缝同步 SVN
</div>

<div class="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
  <div v-click class="tech-card text-center float-animation">
    <div class="text-4xl mb-3">🛡️</div>
    <div class="font-mono text-sm">pre-receive 门禁</div>
  </div>
  <div v-click class="tech-card text-center float-animation" style="animation-delay: 0.2s">
    <div class="text-4xl mb-3">🏷️</div>
    <div class="font-mono text-sm">marker refs</div>
  </div>
  <div v-click class="tech-card text-center float-animation" style="animation-delay: 0.4s">
    <div class="text-4xl mb-3">🔔</div>
    <div class="font-mono text-sm">飞书通知</div>
  </div>
  <div v-click class="tech-card text-center float-animation" style="animation-delay: 0.6s">
    <div class="text-4xl mb-3">🔁</div>
    <div class="font-mono text-sm">git-svn 同步</div>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 opacity-60">
  <div class="text-sm">cycleccc</div>
  <div class="text-sm">•</div>
  <div class="text-sm">2025</div>
</div>

---
layout: center
---

# 关键结论（首页口径）

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">✅ 质量门禁：不合格 push 直接拒绝</div>
    <div class="text-sm opacity-80 leading-relaxed">
      通过 <span class="font-mono">pre-receive</span> 执行 AI Review；只有 <span class="font-mono">CONFIRMED</span> 明确问题才能拒绝。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">🏷️ “通过标记”：写到独立 ref</div>
    <div class="text-sm opacity-80 leading-relaxed">
      <span class="font-mono">post-receive</span> 写 <span class="font-mono">refs/ai-reviewed/&lt;branch&gt;</span>，绕过 quarantine 阶段不可写 refs 的限制。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">🔁 Git Push 后自动同步 SVN</div>
    <div class="text-sm opacity-80 leading-relaxed">
      本地 wrapper：push 成功后自动 <span class="font-mono">git svn rebase/dcommit</span>，作者仍是本人。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">📊 评分归一化：避免 0/100 两极</div>
    <div class="text-sm opacity-80 leading-relaxed">
      评分主要用于展示/通知；判定以规则为准（<span class="font-mono">minScore</span> + <span class="font-mono">CONFIRMED</span>）。
    </div>
  </div>
</div>

---
layout: center
---

# 背景与目标

<div class="grid grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
  <div v-click class="text-center">
    <div class="text-6xl mb-6">🗂️</div>
    <div class="text-xl font-semibold mb-3 gradient-text">SVN 为主</div>
    <div class="text-sm opacity-75 leading-relaxed">
      管理层偶尔查看 SVN 记录<br/>
      但研发主流程仍希望用 Git
    </div>
  </div>
  <div v-click class="text-center">
    <div class="text-6xl mb-6">🧑‍💻</div>
    <div class="text-xl font-semibold mb-3 gradient-text">减少人肉操作</div>
    <div class="text-sm opacity-75 leading-relaxed">
      让“质量检查/同步 SVN”自动化<br/>
      失败时给到可执行的原因
    </div>
  </div>
  <div v-click class="text-center">
    <div class="text-6xl mb-6">🛡️</div>
    <div class="text-xl font-semibold mb-3 gradient-text">质量门禁</div>
    <div class="text-sm opacity-75 leading-relaxed">
      不合格 push 直接拒绝<br/>
      降低主分支引入风险
    </div>
  </div>
</div>

---
layout: center
---

# 关键约束（为什么要这样做）

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">🚧 pre-receive quarantine</div>
    <div class="text-sm opacity-80 leading-relaxed">
      在 quarantine 阶段 <span class="font-mono">不能写 refs/tag</span>，否则 push 会异常。<br/>
      所以“通过标记”必须放到 <span class="font-mono">post-receive</span>。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">🧷 Git 标准 hook 没有 post-push</div>
    <div class="text-sm opacity-80 leading-relaxed">
      客户端只能通过 wrapper（或 CI）模拟 post-push 行为；这里选择本地脚本包装。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">👤 SVN author 绑定账号</div>
    <div class="text-sm opacity-80 leading-relaxed">
      服务器统一账号写 SVN 会丢失作者信息；<br/>
      因此 dcommit 必须在个人本地执行。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">📌 大 diff / 无相关语言变更</div>
    <div class="text-sm opacity-80 leading-relaxed">
      对特定 paths 评审，过大 diff 默认放行但会记录/提示拆分。
    </div>
  </div>
</div>

---
layout: center
---

# 端到端流程（一个命令完成）

```text
开发者 git psvn
  └─ git push
       └─ Gitea pre-receive: AI Review
             ├─ 不通过 -> 拒绝 push（并通知）
             └─ 通过 -> 继续
       └─ Gitea post-receive: 写 refs/ai-reviewed/{branch}
       └─ Gitea post-receive: 飞书通知（读 review 日志）
  └─ 本地脚本：检查 marker -> git svn rebase/dcommit
```

---
layout: center
---

# 核心机制 1：只用「CONFIRMED」才能拒绝

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-3">规则</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li><span class="font-mono">CONFIRMED:</span> 明确问题（允许 <span class="font-mono">pass=false</span>）</li>
      <li><span class="font-mono">RISK:</span> 风险/信息不足（必须 <span class="font-mono">pass=true</span>）</li>
      <li>没有 CONFIRMED 时：即便模型给了 <span class="font-mono">pass=false</span>，也会被「软通过」</li>
    </ul>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-3">为什么</div>
    <div class="text-sm opacity-80 leading-relaxed">
      把“拦截权”收敛到可复核的明确问题，降低误杀成本；<br/>
      把更多建议留在通知里，持续迭代规则和提示词。
    </div>
  </div>
</div>

---
layout: two-cols
---

# 核心机制 2：证据要求（否则降级为 RISK）

- 证据要求（任一即可）：
  - 方式 A：`path/to/file.ts:123` 或 `path/to/file.ts#L123`
  - 方式 B：直接引用 diff 片段（反引号包裹）
- 缺少证据的 `CONFIRMED` 会被自动降级为 `RISK`

::right::

<<< @/snippets/10-ai-review.key-parts.sh bash {2-80}

---
layout: center
---

# 评分与准入规则

- 准入：`CONFIRMED` + `minScore`
- 评分：`AI_REVIEW_SCORE_MODE`

---
layout: center
---

# 开关与跳过策略（降低摩擦）

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-3">可控跳过</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li>无 JS/TS 变更：直接通过（可记录日志）</li>
      <li>diff 过大：默认不拦截，但提示拆分（可记录日志）</li>
      <li>紧急场景：提交信息含 <span class="font-mono">[ai-review:force]</span> 可强制通过（建议受控开启）</li>
    </ul>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-3">为什么这样设计</div>
    <div class="text-sm opacity-80 leading-relaxed">
      让门禁足够“硬”，但入口足够“顺”；通过可观测与迭代，把摩擦从“日常流程”转移到“规则优化”上。
    </div>
  </div>
</div>

---
layout: two-cols
---

# 核心机制 3：marker refs（可选的二次校验）

- push 成功后，`post-receive` 写入 marker：`refs/ai-reviewed/{branch} -> {newrev}`
- marker 只做“标记”，失败不影响 push（仅影响二次校验）

::right::

<<< @/snippets/20-ai-review-mark-reviewed.sh bash {2-80}

---
layout: two-cols
---

# 开发者侧：一个 alias（push + svn）

推荐 alias：

```bash
git config --global alias.psvn '!./scripts/push-with-svn origin master:master'
```

- 团队口径：只用 `git psvn` 推主分支

::right::

<<< @/snippets/push-with-svn.sh bash {2-80}

---
layout: center
---

# 可观测性：日志 + 快速校验

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">日志结构</div>
    <div class="text-sm opacity-80 leading-relaxed">
      每次 push 生成 JSON 日志（score/pass/reasons/forced/soft_pass）。<br/>
      post-receive 通知直接读日志，避免重复计算。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">快速校验 marker</div>
```bash
git ls-remote origin "refs/ai-reviewed/master"
```
  </div>
</div>

---
layout: center
---

# Gitea Actions：自动部署测试环境（示例）

<<< @/snippets/deploy-test.yml yaml {all}

---
layout: center
---

# 配置模板（脱敏）

<<< @/snippets/ai-review.env.example bash {all}

---
layout: center
---

# 推行计划（建议口径）

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click class="tech-card">
    <div class="text-lg font-semibold mb-2">Phase 1</div>
    <div class="text-sm opacity-80">在单仓库试点，观察误报/耗时/拒绝率。</div>
  </div>
  <div v-click class="tech-card">
    <div class="text-lg font-semibold mb-2">Phase 2</div>
    <div class="text-sm opacity-80">规范必须用 <span class="font-mono">git psvn</span>；本地 wrapper 统一入口。</div>
  </div>
  <div v-click class="tech-card">
    <div class="text-lg font-semibold mb-2">Phase 3</div>
    <div class="text-sm opacity-80">模板化 env + hooks，复制到更多仓库。</div>
  </div>
  <div v-click class="tech-card">
    <div class="text-lg font-semibold mb-2">Phase 4</div>
    <div class="text-sm opacity-80">持续迭代：提示词、规则库、评分策略、告警降噪。</div>
  </div>
</div>

---
layout: center
---

# 安全与合规（分享版要点）

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">🔒 Secrets 不进仓库</div>
    <div class="text-sm opacity-80 leading-relaxed">
      <span class="font-mono">AI Key / Webhook</span> 仅放在服务器 env 或 secrets 管理；仓库只提供模板示例。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">🧩 最小权限</div>
    <div class="text-sm opacity-80 leading-relaxed">
      Token 只授予必要范围；脚本超时、diff 上限、日志权限收敛（<span class="font-mono">umask 077</span>）。
    </div>
  </div>
</div>

---
layout: center
---

# 常见问题（现场最容易被问）

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">为什么 push 失败但没有 post-receive 通知？</div>
    <div class="text-sm opacity-80 leading-relaxed">
      push 失败不会触发 post-receive，所以失败通知必须由 pre-receive 直接发送（或客户端提示）。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">marker 没写上怎么办？</div>
    <div class="text-sm opacity-80 leading-relaxed">
      marker 只用于“二次校验”，写入失败不影响 push；排查分支正则与 post-receive 脚本即可。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">评分仍很极端？</div>
    <div class="text-sm opacity-80 leading-relaxed">
      设置 <span class="font-mono">AI_REVIEW_SCORE_MODE=normalize</span>；同时优化提示词的评分区间。
    </div>
  </div>
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">SVN 没同步？</div>
    <div class="text-sm opacity-80 leading-relaxed">
      确认团队统一用 <span class="font-mono">git psvn</span>；必要时开启 <span class="font-mono">REQUIRE_AI_REVIEW_MARKER=1</span>。
    </div>
  </div>
</div>

---
layout: center
---

<div class="text-5xl font-bold gradient-text mb-8">
Q&A
</div>

<div class="text-lg opacity-80">
如果要把这套方案推广到更多仓库：我们下一步重点是「模板化 + 观测数据 + 降噪策略」。
</div>

<div class="text-sm opacity-70 mt-8">
参考：<a href="https://sli.dev/" target="_blank">Slidev</a> · <a href="https://github.com/antfu/talks" target="_blank">antfu/talks</a>
</div>
