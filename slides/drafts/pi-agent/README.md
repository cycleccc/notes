# Pi Agent 分享会

状态：草稿，不参与 `slides/` 的正式构建和 GitHub Pages 发布。

这是一个以学习为目的制作的 Slidev 分享稿，主线是：

`model -> tool call -> host execution -> observation -> next turn`

## 运行

```bash
cd slides/drafts/pi-agent
pnpm install --frozen-lockfile
pnpm dev
```

从仓库根目录执行以上命令，打开终端输出的本地地址即可开始演示。此目录是独立的 pnpm workspace，保留草稿已有依赖版本。导出 PDF：

```bash
pnpm run export
```

## 演示前检查

- 使用本地浏览器打开 Web 版，不依赖现场网络。
- 准备一份不会泄露凭据的示例项目。
- 现场演示失败时，切换到第 10 页的静态流程，不阻塞分享。
