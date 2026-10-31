# 从对话到行动：Harness 如何运行 Agent

状态：Slidev 草稿，不参与正式站点与 GitHub Pages 发布。

主讲 14 页，建议 25–30 分钟，围绕一个问题：模型如何通过 Harness，从给出建议走向执行一个任务。Pi 是具体实现样本。另有 4 页可选附录，不计入主讲。

主线：人原本维持工作循环；接上工具，模型请求开始产生动作；结果回传支持下一轮；运行系统管理状态、执行范围和停止条件。

Agent 指完整的任务执行系统，Harness 指模型外围组织工作过程的运行系统。正文用一页解释 Pi 的工具消息与源码，一页核对真实核心循环；完整包结构、MCP、Skills、会话树仍留作按需深入。每页 Markdown 注释保留讲者备注与来源，按 `p` 进入讲者模式。

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
| 10–12 | Pi 的职责、工具消息与源码、真实核心循环实验 |
| 13–14 | 四款产品的公开设计选择，回扣 Harness 的作用 |
| 15–18 | 可选附录：Pi 源码定位、实际用例、产品细节、来源 |

## 动画与演讲控制

视觉参考 Anthony Fu 的《Make Tools That People Love》与 sxzz 的《Vue Vapor：重新发明》：大字、留白和低对比背景控制节奏，用逐步变化的代码解释能力如何形成。设计出处见 [sources.md](sources.md)。

- 方向键推进与回看。第 2–3 页逐步显露任务产物与人的操作。
- 第 4–5 页使用 Shiki Magic Move，把回答逐步改成工具请求、执行、结果回传与工作循环。代码是职责伪代码，非真实 Pi API。
- 第 6 页点击「自动播放」演示完整八步，每步约 2.6 秒，播完停止。可「暂停」「重放」或用左右按钮逐步讲。离开该页自动暂停。
- 第 7 页把历史收拢为摘要，再组织下一次输入；第 8 页切换代码库、浏览器与业务系统；第 9–10 页逐项突出运行边界与 Pi 的职责。
- 第 11 页逐步展示工具定义、请求、源码节选与结果消息；第 12 页按真实本地记录推进读文件、失败、修改、复测与结束。
- 第 13 页逐行对照四款产品的公开设计，第 14 页收束。
- 系统开启「减少动态效果」时，直接呈现各步结果。
- 回放页面不调用模型、不修改磁盘。真实断言见第 16 页与 `demo/`。

## 离线演示

第 6 页是确定性的八步教学回放，不调用模型或本机工具。第 16 页使用代码变形，并在浏览器实际计算四个用例。这些都不是真实 Pi 工具执行记录。

```bash
node demo/check.mjs before
node demo/check.mjs
```

前者预期 2/4 通过、退出码 1；后者 4/4 通过、退出码 0。代码前后版本分别保留在 `demo/parser.before.mjs` 与 `demo/parser.mjs`。

## Pi 核心循环实验（第 12 页）

这是与模型服务断开的真实 Pi 核心运行：发布包 `@earendil-works/pi-agent-core@1.4.0` 负责循环与工具调度，`scriptedStream` 预设模型回复，三个精简自定义工具负责临时文件读写和 Node 测试。它不是完整 Pi CLI 自主修复，也不是其内置工具的逐字实现。

```bash
pnpm --dir demo/pi-runtime install --frozen-lockfile --ignore-scripts
pnpm --dir demo/pi-runtime demo
```

需要 Node.js 22.19+。第一次安装需要网络；依赖就绪后运行不需要网络、模型或 API Key。每次新建临时目录，保留完整 `report.json`，不改动仓库中的 parser。复制的验收脚本只将输出标签改为 `parser.mjs`，所有断言保持一致。脚本断言：四次工具执行、五次模型边界调用、调用 ID 与结果对应、失败输出进入下一次输入、复测通过和最终文件差异。

第 12 页读取已保存的 `demo/pi-runtime/result.json`，不在网页执行命令。更新记录可运行 `node demo/pi-runtime/run.mjs --record`，然后重新构建。模型回复与工具实现的边界必须随演示一起说明：这个实验验证运行机制，不验证模型的自主规划能力。

## 真实 Pi 演示准备

第 12 页之后切换的任务需要已经安装 Pi 并配置可用模型。以下 PowerShell 命令创建唯一临时目录，复制失败版本与验收脚本，且不修改仓库里的完成版本：

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

临时仓库的初始提交仅用于现场查看 diff。第 12 页之后衔接真实模型演示，完整提示词如下，复制到真实 Pi 中观察工具调用和输出：

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

模型调用不可用时，使用第 6 页示意回放、第 12 页真实 Pi 核心实验与第 16 页本地断言继续讲解。全部引用及核对边界见 [sources.md](sources.md)。
