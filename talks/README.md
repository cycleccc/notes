# talks

技术分享基类（参考 antfu/talks 的工程结构）。

## 开始

```bash
cd talks
pnpm install
pnpm dev
```

## GitHub Pages 部署

仓库根目录已提供 GitHub Actions 工作流：`.github/workflows/pages.yml`。

1. GitHub 仓库 → `Settings` → `Pages`
2. `Build and deployment` → `Source` 选择 `GitHub Actions`
3. 推送到 `main/master` 后会自动构建并发布 `talks/dist`

访问链接（以仓库名为 `notes` 举例）：

- 首页：`https://<user>.github.io/notes/`
- 本次分享：`https://<user>.github.io/notes/2025-12-26-ai-review-git-svn/`

## 内容

- `antfu-talks/`：Anthony Fu 的 talks（用于参考风格与实现）
- `t3-fullstack/`：T3 Fullstack（历史分享，Marp Markdown）
- `2025-12-26-ai-review-git-svn/`：AI Review + Git/SVN 推行方案（Slidev）
- `enterprise-fullstack/`：企业级全栈技术栈分享（Slidev）
