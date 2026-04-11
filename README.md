# cycleccc notes

当前主要维护的是技术分享内容，笔记以归档为主。

## 主结构

- `slides/`：Slidev deck 工程，正式分享在 `slides/decks/`
- `site/`：Astro 站点实验目录（当前不作为线上发布入口）
- `archive/`：历史笔记归档
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

站点实验（可选）：

```bash
cd site
pnpm run build:with-slides
```

GitHub Pages 当前发布目录为 `slides/dist`。
