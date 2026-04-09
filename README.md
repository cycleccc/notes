# yaolongfei content studio

这个仓库已经从“杂项笔记库”重构成了一个以分享内容为核心的技术内容仓库。

## 主结构

- `site/`：对外展示站点，首页、分享列表、单个分享落地页都在这里
- `slides/`：Slidev deck 工程，正式分享在 `slides/decks/`
- `archive/`：旧笔记归档，不再作为仓库主入口
- `images/` / `themes/`：历史素材，按需保留

## 本地使用

内容站：

```bash
cd site
pnpm install
pnpm dev
```

Slidev deck：

```bash
cd slides
pnpm install
pnpm dev
```

整站构建：

```bash
cd site
pnpm run build:with-slides
```

GitHub Pages 工作流会发布 `site/dist`，其中 `slides/` 会作为站内子路径挂载。
