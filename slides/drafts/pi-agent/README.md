# 从对话到行动：Harness 如何运行 Agent

状态：Slidev 草稿，不参与正式站点与 GitHub Pages 发布。

主讲 12 页，建议 20–25 分钟，围绕一个问题：模型如何通过 Harness，从给出建议走向执行一个任务。Pi 是具体实现样本。另有 4 页可选附录，不计入主讲。

主线：人原本维持工作循环；接上工具，模型请求开始产生动作；结果回传支持下一轮；运行系统管理状态、执行范围和停止条件。

Agent 指完整的任务执行系统，Harness 指模型外围组织工作过程的运行系统。包结构、协议字段、MCP、Skills、会话树等不作为独立主讲章节。每页 Markdown 注释保留讲者备注与来源，按 `p` 进入讲者模式。

## 本地运行

使用 Slidev 53.0.0（从 52.19.1 升级），需要 Node.js 22.12+、pnpm 10.22.0。此草稿使用独立 workspace。53.0 的 Mermaid 升至 12，本稿的主讲使用 Vue / CSS 场景动画，附录保留可编辑 SVG 与代码变形。

```bash
cd slides/drafts/pi-agent
pnpm install --frozen-lockfile
pnpm dev --port 3030
```

预览地址：<http://localhost:3030/>。生产构建使用 `pnpm build`，PDF 导出使用 `pnpm run export`。PDF 不保留交互，教学回放在静态输出中只显示当前步骤。

如果本机默认 pnpm 8，可使用 `pnpm dlx pnpm@10.22.0 install --frozen-lockfile` 安装，避免重写锁文件。

## 讲解路线

| 页码 | 内容 |
| --- | --- |
| 1–3 | 从建议到任务产物，识别人原本承担的工作 |
| 4–6 | 工具、反馈、连续运行，用同一修复案例回放 |
| 7–9 | 长任务如何接续，工具如何扩展能力，如何控制执行 |
| 10–12 | 落到 Pi，再对应其他产品，回扣 Harness 的作用 |
| 13–16 | 可选附录：Pi 源码定位、实际用例、产品细节、来源 |

## 动画与演讲控制

视觉参考 Anthony Fu 的《Make Tools That People Love》与 sxzz 的《Vue Vapor：重新发明》：大字、留白和低对比背景控制节奏，用逐步变化的代码解释能力如何形成。设计出处见 [sources.md](sources.md)。

- 方向键推进与回看。第 2–3 页逐步显露任务产物与人的操作。
- 第 4–5 页使用 Shiki Magic Move，把回答逐步改成工具请求、执行、结果回传与工作循环。代码是职责伪代码，非真实 Pi API。
- 第 6 页点击「自动播放」演示完整八步，每步约 2.6 秒，播完停止。可「暂停」「重放」或用左右按钮逐步讲。离开该页自动暂停。
- 第 7 页把历史收拢为摘要，再组织下一次输入；第 8 页切换代码库、浏览器与业务系统；第 9–10 页逐项突出运行边界与 Pi 的职责。
- 第 11–12 页以产品名称、关键判断和结论收束，保留安静的停顿页面。
- 系统开启「减少动态效果」时，直接呈现各步结果。
- 回放页面不调用模型、不修改磁盘。真实断言见第 14 页与 `demo/`。

## 离线演示

第 6 页是确定性的八步教学回放，不调用模型或本机工具。第 14 页使用代码变形，并在浏览器实际计算四个用例。这些都不是真实 Pi 工具执行记录。

```bash
node demo/check.mjs before
node demo/check.mjs
```

前者预期 2/4 通过、退出码 1；后者 4/4 通过、退出码 0。代码前后版本分别保留在 `demo/parser.before.mjs` 与 `demo/parser.mjs`。

## 真实 Pi 演示准备

第 10 页的任务需要已经安装 Pi 并配置可用模型。以下 PowerShell 命令创建唯一临时目录，复制失败版本与验收脚本，且不修改仓库里的完成版本：

```powershell
$piDemoDir = Join-Path $env:TEMP ('pi-sharing-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path (Join-Path $piDemoDir 'demo') | Out-Null
Copy-Item -LiteralPath './demo/parser.before.mjs' -Destination (Join-Path $piDemoDir 'demo/parser.mjs')
Copy-Item -LiteralPath './demo/check.mjs' -Destination (Join-Path $piDemoDir 'demo/check.mjs')
Set-Location -LiteralPath $piDemoDir
git init
git add demo
git -c user.name=Demo -c user.email=demo@example.invalid commit -m '演示初始状态'
pi
```

临时仓库的初始提交仅用于现场查看 diff。第 10 页衔接真实演示，完整提示词如下，复制到真实 Pi 中观察工具调用和输出：

```text
先阅读 demo/parser.mjs 和 demo/check.mjs。
运行 node demo/check.mjs，解释实际失败原因。
只修改 demo/parser.mjs，不修改验收脚本。
undefined、null、空字符串应返回空字符串，
普通输入仍去除首尾空白。
重跑验收，并展示实际输出和修改 diff。
不要安装依赖、调用网络或修改其他文件。
```

执行环境权限需要单独配置，自然语言中的范围要求不构成沙箱。不要给演示目录放入凭据。

模型调用不可用时，使用第 6 页示意回放与第 14 页本地断言继续讲解。全部引用及核对边界见 [sources.md](sources.md)。
