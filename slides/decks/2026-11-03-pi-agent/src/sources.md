# 内容来源与核对范围

核对日期：2026-10-26。Pi 源码固定到 [d5b3de22](https://github.com/earendil-works/pi/tree/d5b3de22d0e24a3e9c38a9410d3329b099717283)，不是对未来版本的承诺。

| 内容 | 官方来源 |
| --- | --- |
| Pi 的定位、默认权限与扩展方式 | [README](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/README.md) |
| Agent 状态、消息转换与事件流 | [agent/README](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/agent/README.md) |
| 工具参数校验、执行、异常与结果回注 | [agent-loop.ts](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/agent/src/agent-loop.ts) |
| read 工具名称及 path / offset / limit 参数 | [read.ts](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/src/core/tools/read.ts) |
| 内置工具集合 | [tools/index.ts](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/src/core/tools/index.ts) |
| 配置与上下文发现 | [configuration.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/configuration.md) |
| /tree、/fork、/compact 与当前分支上下文 | [sessions.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/sessions.md) |
| JSONL、id / parentId、compaction 条目 | [session-format.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/session-format.md) |
| 历史压缩与保留边界 | [compaction.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/compaction.md) |
| 扩展运行位置与可注册能力 | [extensions.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/extensions.md) |
| Skills 与包资源 | [skills.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/skills.md)、[packages.md](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/coding-agent/docs/packages.md) |

## 演示边界

- 第 4–6 页的代码演进、文件变化、测试输出与八步回放为人工编排的教学模拟，不是实际模型会话录屏。第 12 页展示实际 Pi 核心循环的保存记录，使用预设模型回复与自定义教学工具；所有页面均不执行本机命令。
- `demo/` 可离线重放修复前后的行为，输出来自实际断言。
- 附录第 16 页在浏览器计算示例，不等于 Pi 在本机执行工具。
- 职责伪代码展示简化循环，省略参数校验、错误处理、取消及其他停止条件；并发、重试和流式执行以固定版本源码为准。
- `/tree` 和 `/fork` 操作的是会话，不会自动回滚磁盘文件。

## 教学路线与产品对照

| 来源 | 使用范围 |
| --- | --- |
| [冬瓜的 Pi Agent 教程](https://www.dgzhuya.com/modules/ch01-overview) | 参考十章覆盖的知识领域，改为按能力依赖讲解，未照搬章节内容 |
| [三层架构](https://www.dgzhuya.com/modules/ch02-three-layer-arch) | 三个核心包与 UI 基础设施的职责定位 |
| [Codex as a platform](https://developers.openai.com/blog/codex-as-a-platform) | Harness、会话状态、事件、工具、沙箱与批准策略 |
| [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | 收集上下文、行动、验证的循环，模型与 Harness 的分工 |
| [OpenCode Agents](https://opencode.ai/docs/agents/) | 主 Agent、子 Agent、模型与工具权限配置 |

对照核对日期：2026-10-26。OpenCode 使用 `/docs/` 文档，不混用 `/v2/docs/` 的配置字段。模式和默认权限会随版本、环境及用户配置变化。

正文按工具、结果反馈、持续运行与状态管理的因果关系讲解 Harness。图示表示职责，不代表 Pi 内置全面批准系统。产品映射是对公开职责的归纳，不推断闭源模型、服务实现，也不进行未经测量的性能排名。

第 6 页 `RepairReplay` 的请求、顺序与结果展示是人工编排的教学回放。测试通过数依据真实本地断言，仍不构成真实 Pi 运行记录。第 12 页之后可衔接真实模型演示，需要在临时目录准备失败版本，并实际启动 Pi 才能观察真实会话。

## Slidev 表达与版本

- [Slidev 53.0.0 发布说明](https://github.com/slidevjs/slidev/releases/tag/v53.0.0)，Node.js 22.12+、Mermaid 12。
- [点击与动画](https://sli.dev/guide/animations)、[逐行聚焦](https://sli.dev/features/line-highlighting)、[Shiki Magic Move](https://sli.dev/features/shiki-magic-move)。
- [Vue 组件](https://sli.dev/guide/component)、[圈画标记](https://sli.dev/features/rough-marker)、[代码分组](https://sli.dev/features/code-groups)。
- 能力取舍：正文使用代码变形、历史收拢、环境切换与修复回放。详细产品对照放在可选附录，不为展示功能增加主讲章节。
- 场景动画、附录 SVG 机制图与回放均为教学示意，不是实际 Pi 执行日志。附录第 16 页的测试结果由浏览器按对应函数计算。


## 视觉与演讲参考

- Anthony Fu：[Make Tools That People Love](https://talks.antfu.me/2025/squiggleconf/)，[源码](https://github.com/antfu/talks/tree/main/2025-09-18/src)。参考大字排版、留白、柔和背景与页面节奏。
- sxzz：[Vue Vapor：重新发明](https://talks.sxzz.dev/2024-07-vueconf/)，[源码](https://github.com/sxzz/talks/tree/main/2024-07-vueconf/src)。参考把代码逐步变形，沿着能力形成的顺序解释机制。

仅参考表达方法，未复制上述项目的源码或素材。本稿的布局、CSS 与修复回放组件独立编写。设计参考核对日期：2026-10-27。

## Pi 实现补充（2026-10-31）

- 第 11 页的字段示例依据固定版本 [types.ts](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/agent/src/types.ts) 与 [agent-loop.ts](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/agent/src/agent-loop.ts)：L268 查 toolCall、L283–285 回注消息、L412 调模型、L726–737 找工具和验证参数、L842 执行、L940 构造结果。节选省略周边代码，不是可独立运行函数。工具定义、请求和结果是字段教学示例，不是现场模型输出。
- 第 12 页执行 npm 发布包 [@earendil-works/pi-agent-core@1.4.0](https://www.npmjs.com/package/@earendil-works/pi-agent-core/v/1.4.0)，固定版本与依赖完整性记录在 `demo/pi-runtime/pnpm-lock.yaml`。源码定位版本的 [package.json](https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/agent/package.json) 同样标记 1.4.0；不把 npm 产物声称为已核对 Git 提交完全相同的二进制。
- `demo/pi-runtime/run.mjs` 调用实际 `runAgentLoop`，替换模型流为预设回复，注册精简自定义 read/edit/bash。真实 Pi 完成参数校验、执行调度、结果消息创建和回注。真实读写与测试仅发生在唯一临时目录。页面读取 `result.json` 保存的输出，不重新执行工具。
- 实验记录：5 次模型边界调用、4 次工具执行，修复前 2/4 通过，修复后 4/4 通过，最终事件 agent_end；脚本断言以上条件及修复差异。模型没有实际推理，因此不证明 Pi CLI 或任何模型能自主解决任务。
- 第 13 页四款产品的侧重点重新核对官方 [Codex as a platform](https://developers.openai.com/blog/codex-as-a-platform)、[Claude Code 工作原理](https://code.claude.com/docs/en/how-claude-code-works)、[OpenCode Agents](https://opencode.ai/docs/agents/)。不作能力排他或性能排名，OpenCode 保留 /docs/ 口径。
