---
theme: default
title: 从对话到行动：Harness 如何运行 Agent
author: 内部技术分享
colorSchema: dark
aspectRatio: 16/9
transition: none
mdc: true
routerMode: hash
fonts:
  provider: none
---

<div class="cover-kicker">用 Pi 看懂 Coding Agent</div>

# AI 如何从回答问题，<br>走到完成任务

<p class="cover-subtitle">Harness（运行系统）怎样组织模型、工具与反馈</p>

<!--
开场只问一个问题：同样是问模型，为什么聊天窗口给出建议，Coding Agent 却能读文件、修改和运行测试？
今天按能力形成的因果顺序讲。Agent 指整套能围绕目标行动的系统，Harness 指模型外围的运行系统。
模型本身提供理解、推理和生成下一步请求的能力，Harness 负责组织工作过程。两者都影响效果。
Pi 是可阅读的实现样本，Codex、Claude Code、OpenCode 只在最后作对应。
来源：sources.md 的 Pi 文档与三款产品官方资料。
-->

---
name: goal
clicks: 1
---

# 同一句「帮我修好」，期待的结果变了

<div class="single-request">帮我修复 parser 的空值报错</div>
<div class="answer-vs-action">
<div><span>一问一答</span><strong>一段修改建议</strong><p>你把建议变成实际修改</p></div>
<div v-click><span>Agent</span><strong>实际修改与验证结果</strong><p>系统组织中间的工作过程</p></div>
</div>

<!--
保持同一个 parser 修复任务。空值输入会报错，普通字符串的 trim 行为要保留。
这里比较的是两种工作方式。带工具的聊天应用同样可以承接行动，不用界面外观定义 Agent。
Agent 的实际产物必须以工具输出、文件变化和验收结果为依据，不承诺每次成功。
过渡：先看看在只有模型回答时，中间那些工作是谁做的。
-->

---
name: human-loop
clicks: 2
---

# 对话模式里，人让工作继续

<MechanismDiagram kind="manual" :step="$clicks" />
<p class="diagram-caption">你负责收集材料、执行建议，再把结果带回对话。</p>

<!--
你找代码、贴给模型。模型给建议，你改文件、运行测试，再把报错贴回去。每一步仍然依赖人搬运。
这是一条由人维持的工作循环。要让系统多做一些，先把人的实际操作变成可以调用的工具。
这是工作方式示意，不是某款产品的协议。
-->

---
name: tools
clicks: 2
---

# 工具让模型的请求变成真实动作

<MechanismDiagram kind="tool" :step="$clicks" />
<p class="diagram-caption">模型选动作、填参数，Harness 调度工具，工具操作真实环境。</p>

<!--
模型输出结构化的 read 请求，运行系统调用真正的读取函数。文件内容并非模型凭空知道。
同样的方法可以接 edit 和 bash，分别修改文件、运行命令。工具名称与参数因产品而异。
此页只讲请求如何走向真实动作。下一页再把结果接回来。
来源：Pi 固定版本 read.ts、agent-loop.ts，链接见 sources.md。
-->

---
name: feedback
clicks: 4
---

# 把结果交回模型，下一步就有了依据

<MechanismDiagram kind="loop" :step="$clicks" />
<p class="diagram-caption">读到的代码、失败输出、复测结果，都能改变下一步。</p>

<!--
关键的一步是结果回传：读完文件后重新调用模型，模型才知道实际实现；测试失败后把失败输出带回去，模型才有依据调整。
Harness 维护消息和运行循环，模型依据本轮输入生成下一步。得到工具请求就继续执行，再把结果接回来。
没有工具请求可以结束这一轮，但任务是否正确完成仍要看证据。也可能在需要澄清或遇到阻碍时停下。
来源：Pi 固定版本 agent-loop.ts；Codex as a platform；Claude Code how-it-works。
-->

---
name: replay
---

# Harness 把一次次调用接成修复过程

<AgentTrace />

<!--
按按钮回放同一个任务：目标进入上下文，读取文件，测试失败，模型提出修改，宿主执行，复测，检查 diff，给出结论。
请听众注意：每一步模型并没有直接碰磁盘，Harness 调度的工具才产生实际动作。工具结果又驱动下一次生成。
这是人工编排的教学回放，不是实际 Pi 录屏，不会在页面调用模型或本机命令。通过数来自本地示例断言。
真正的 Pi 演示准备见 README，可在讲到第 10 页时切换。
-->

---
name: continuity
clicks: 2
---

# 任务变长，Harness 让进度接得上

<MechanismDiagram kind="continuity" :step="$clicks" />
<p class="diagram-caption">保存目标、发现和进度，为下一次调用组织相关信息。</p>

<!--
一次模型生成结束后，持续工作的状态需要运行系统管理。下一次调用需要任务目标、已发现的事实和近期工具结果。
完整记录可以持久化，本轮输入按窗口和相关性取舍，长历史可以压缩。摘要可能丢失细节，必要时重读证据。
这里把上下文管理和会话保存合在一页，只解释为什么长任务能接续，不展开 token 预算、JSONL 或树结构。
来源：Pi 固定版本 sessions.md、compaction.md；Claude Code how-it-works。
-->

---
name: reach
clicks: 3
---

# 接上更多工具，行动范围随之扩展

<MechanismDiagram kind="reach" :step="$clicks" />
<p class="diagram-caption">修代码、查资料、操作业务系统，都可以接到同一个循环上。</p>

<!--
看起来无所不能的一个原因，是循环可以连接不同工具。终端能操作代码与进程，浏览器工具能观察和操作网页，业务接口能接入工单、文档与数据。
这只是可接入能力的示意，不表示每个产品都默认具备这些工具。模型是否能正确完成工作，还取决于其能力、上下文和反馈质量。
Skills、MCP、扩展等可以帮助提供方法或连接能力，此处不再逐个开章节。它们最后仍要服务于这个行动和反馈循环。
来源：Pi 固定版本 extensions.md；各产品公开工具与扩展资料，见 sources.md。
-->

---
name: control
clicks: 2
---

# Harness 还管理执行边界与停止条件

<MechanismDiagram kind="boundary" :step="$clicks" />
<p class="diagram-caption">执行前检查策略，运行中支持取消，结束时检查结果。</p>

<!--
当系统可以连续行动，运行系统还要处理执行范围、批准策略、错误、取消和运行限制。具体限制能力取决于产品和配置。
Pi 核心工具不能描述为自带全面权限沙箱；扩展通常拥有宿主进程权限。环境隔离需要相应的实际设施。
不要把模型回复“完成了”等同于正确完成。复测输出和 diff 才是本例的验收证据。
来源：Pi coding-agent README、extensions.md；Codex as a platform。
-->

---
name: pi
clicks: 3
---

# Pi 是这条工作链路的一种具体实现

<MechanismDiagram kind="pi" :step="$clicks" />
<p class="diagram-caption">把同一个修复任务交给 Pi，就能观察这条链路实际运行。</p>

<!--
此处把已经讲清楚的机制落到 Pi：模型提出请求，Pi 组织调用与运行状态，read / edit / bash 等工具产生动作，结果接回模型。
不展开分包、事件类型和供应商协议。想读实现时再打开附录源码定位页。
可切换到真实 Pi 演示。完整提示词和准备步骤见 README，先在独立临时目录放入失败版本，不要覆盖仓库完成版本。
若没有模型连接，用前面的示意回放与附录本地用例继续。自然语言任务范围不是操作系统沙箱。
来源：Pi 固定版本 agent-loop.ts、tools/index.ts 与相关工具实现。
-->

---
name: products
clicks: 1
---

# 其他 Coding Agent，也可以这样理解

<div class="product-names"><span>Codex</span><span>Claude Code</span><span>Pi</span><span>OpenCode</span></div>
<div class="common-work">组织上下文，调用模型，执行工具，再接回结果</div>
<p class="product-conclusion" v-click>各家在工具、上下文组织、执行策略和交互上作出不同选择。</p>

<!--
这是一组用于理解公开职责的共同问题，不主张各家内部使用同样源码或完全一致的消息格式。
同一个模型配上不同 Harness，工具、输入组织和反馈方式也会不同。用户体验与完成效果不能只归因于模型本身。
产品细节放在附录按需讨论，不回到四款产品各讲一遍的结构。
来源：https://developers.openai.com/blog/codex-as-a-platform
https://code.claude.com/docs/en/how-claude-code-works
https://opencode.ai/docs/agents/
Pi 固定版本官方资料，见 sources.md。
-->

---
name: conclusion
clicks: 3
---

# Agent 怎样从对话走向行动

<div class="agent-equation"><strong>模型</strong><span>+</span><strong v-click>Harness</strong><span>+</span><strong v-click>工具与环境</strong></div>
<p class="closing-line" v-click>Harness 接起模型决策、工具执行与结果反馈，让任务持续推进。</p>
<p class="closing-question">如果模型只能回答，剩下的工作是谁在做？</p>

<!--
回扣最开始的对话：此前是人维持整个工作循环，现在由 Harness 把相当一部分步骤连接起来。
Agent 是整体，Harness 是其中组织上下文、工具调用、反馈与运行状态的部分。公式是职责示意，不是严格的充分条件定义。
可访问的工具与环境决定行动范围，模型能力和证据质量影响能否完成任务。持续运行不代表无限能力或保证成功。
主讲到此结束。后续四页是源码定位、实际用例、产品对照和来源，按提问选看。
-->

---
name: architecture
clicks: 3
---

# 附录：沿着职责找 Pi 源码

<MechanismDiagram kind="architecture" :step="$clicks" />

<p class="diagram-caption">核心调用链与终端 UI 基础设施分别承担职责。</p>

<!--
按职责解释三层，不画成每次请求都必须经过 tui 的调用栈。上层可以直接使用模型层能力。
Pi 适合作为教学样本，因为可以沿着具体源码把这些边界找出来。
来源：固定版本 Pi 各包 README；教程 ch02-three-layer-arch。
https://www.dgzhuya.com/modules/ch02-three-layer-arch
-->

---
name: evidence
clicks: 1
---

# 附录：修复前后的实际用例

<div class="evidence-stage">
<div>
<p class="muted small">按下一步，观察代码与结果一起变化</p>

````md magic-move {duration:600}
```js
export function parse(input) {
  return input.trim();
}
```
```js
export function parse(input) {
  return (input ?? '').trim();
}
```
````

</div>
<ParserChecks :fixed="$clicks > 0" />
</div>
<p class="diagram-caption">测试确认约定行为，diff 确认修改范围。</p>

<!--
前一个命令预期退出码 1，后一个命令预期退出码 0。四个断言只能证明这四个输入的行为。
现场可在终端运行这两个命令，不需要网络或模型凭据。测试结果不应让模型自行编造。
这里只核对约定输入的行为。想看修改如何发生，可回到主讲的教学回放或切换到真实 Pi 演示。
-->

---
name: comparison
---

# 附录：四款产品的公开设计

<ProductLens />

<!--
不做能力排他性排名：某产品在此行突出某能力，并不表示其他产品没有。
只讲公开可验证的实现界面，不推断闭源模型训练或未公开的内部服务。
来源：https://developers.openai.com/blog/codex-as-a-platform
https://code.claude.com/docs/en/how-claude-code-works
https://opencode.ai/docs/agents/
Pi 固定版本文档，见 sources.md。
-->

---
name: sources
---

# 附录：源码与阅读入口

<ul class="source-list">
<li><a href="https://www.dgzhuya.com/modules/ch01-overview">冬瓜的 Pi Agent 教程</a><span>系统学习与源码阅读的路线</span></li>
<li><a href="https://github.com/earendil-works/pi/tree/d5b3de22d0e24a3e9c38a9410d3329b099717283">Pi 源码与官方文档</a><span>agent-loop.ts、read.ts、会话与扩展文档</span></li>
<li><a href="https://developers.openai.com/blog/codex-as-a-platform">Codex as a platform</a><span>公开 Harness、工具、事件与执行边界</span></li>
<li><a href="https://code.claude.com/docs/en/how-claude-code-works">How Claude Code works</a><span>上下文、行动与验证循环</span></li>
<li><a href="https://opencode.ai/docs/agents/">OpenCode Agents</a><span>主 Agent、子 Agent 与权限配置</span></li>
</ul>

<p class="muted small mt-6">核对日期：2026-10-26。Pi 固定到 d5b3de22，详细索引见 sources.md。</p>

<!--
教程是二手学习材料，Pi API 与行为以固定版本官方源码为准。
OpenCode 此处使用 /docs/ 文档，不混用 /v2/docs/ 的配置字段。
-->
