# slides

分享 deck 工程，保留 Slidev 作为演示层，外层站点由 `../site` 承接。

## 结构

- `decks/`：正式分享内容
- `drafts/`：未完成的分享，独立运行，不参与正式构建和发布
- `examples/`：参考工程
- `scripts/`：构建、选择器、元数据导出

## 分享索引

| 分享 | 状态 | 正文源码 |
| --- | --- | --- |
| AI 全栈接管工作流分享 | 已发布 | [slides.md](decks/2026-04-26-ai-fullstack-agent-takeover/src/slides.md) |
| TanStack 全家桶技术分享 | 已发布 | [slides.md](decks/2026-03-06-tanstack-family/src/slides.md) |
| AI Review + Git/SVN 推行方案 | 已发布 | [slides.md](decks/2025-12-26-ai-review-git-svn/src/slides.md) |
| T3 Fullstack 技术分享 | 已发布 | [slides.md](decks/2025-04-27-t3-fullstack/src/slides.md) |
| 企业级全栈技术栈分享 | 已发布 | [slides.md](decks/enterprise-fullstack/src/slides.md) |
| Pi Agent：模型如何开始工作 | 草稿 | [slides.md](drafts/pi-agent/slides.md) |

## 开发

```bash
cd slides
pnpm install
pnpm dev
```

`pnpm dev` 会弹出选择器，直接启动某一个 deck 的 Slidev 开发服务。

Pi Agent 草稿使用独立的依赖与锁文件：

```bash
cd slides/drafts/pi-agent
pnpm install --frozen-lockfile
pnpm dev
```

以上路径从仓库根目录进入。草稿完成后，按 `decks/<分享名>/src/` 结构接入正式 workspace，并配置对应的构建路径，再加入发布列表。

## 构建

```bash
cd slides
pnpm run build
pnpm run metadata
```

- `build`：构建所有正式 deck 到 `slides/dist`
- `metadata`：导出 deck 元数据，给 `site/` 使用

## 说明

- `examples/antfu-talks/`：Anthony Fu 的 talks，用于参考结构和视觉实现
- T3 统一维护 Slidev 版本；旧 Marp 源稿、导出文件和专属主题已移除，可通过 Git 历史查阅。
