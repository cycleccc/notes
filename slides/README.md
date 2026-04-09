# slides

分享 deck 工程，保留 Slidev 作为演示层，外层站点由 `../site` 承接。

## 结构

- `decks/`：正式分享内容
- `examples/`：参考工程
- `legacy/`：旧材料与非主线内容
- `scripts/`：构建、选择器、元数据导出

## 开发

```bash
cd slides
pnpm install
pnpm dev
```

`pnpm dev` 会弹出选择器，直接启动某一个 deck 的 Slidev 开发服务。

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
- `legacy/t3-fullstack/`：历史 Marp 材料
