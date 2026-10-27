---
theme: default
title: 从对话到行动：Harness 如何运行 Agent
author: 内部技术分享
colorSchema: dark
aspectRatio: 16/9
transition: fade-out
mdc: true
routerMode: hash
layout: default
class: talk-cover
fonts:
  provider: none
---

<div class="cover-eyebrow">UNDERSTANDING CODING AGENTS</div>

<h1 class="cover-title">从对话<br>到<span>行动</span></h1>

<div class="cover-deck">Harness 如何让模型持续推进任务</div>
<div class="cover-signature">以 Pi 为线索，理解 Coding Agent</div>

<!--
开场只问一个问题：同样是问模型，为什么聊天窗口给出建议，Coding Agent 却能读文件、修改和运行测试？
今天按能力形成的因果顺序讲。Agent 指整套能围绕目标行动的系统，Harness 指模型外围的运行系统。
模型本身提供理解、推理和生成下一步请求的能力，Harness 负责组织工作过程。两者都影响效果。
Pi 是可阅读的实现样本，Codex、Claude Code、OpenCode 只在最后作对应。
来源：sources.md 的 Pi 文档与三款产品官方资料。
-->

---
name: goal
class: talk-question
clicks: 2
---

<div class="quiet-prompt">“帮我修复 parser 的空值报错。”</div>

<h1 class="question-title">AI 给了建议。<br>剩下的呢？</h1>

<div class="expectation" v-click="1">我们期待的，是<span>实际修改</span>。</div>
<div class="question-proof" v-click="2">文件改变了，测试也通过了。</div>

<!--
保持同一个 parser 修复任务。空值输入会报错，普通字符串的 trim 行为要保留。
这里比较的是两种工作方式。带工具的聊天应用同样可以承接行动，不用界面外观定义 Agent。
Agent 的实际产物必须以工具输出、文件变化和验收结果为依据，不承诺每次成功。
过渡：先看看在只有模型回答时，中间那些工作是谁做的。
-->

---
name: human-loop
class: talk-human
clicks: 3
---

<div class="section-label">在只有模型回答的时候</div>

<div class="human-composition">
<h1>是你，<br>让工作继续。</h1>
<div class="human-actions">
<div v-for="(item, n) in ['找代码', '改文件', '跑测试', '贴回结果']" :key="item" :class="{ current: $clicks === n, past: $clicks > n }"><span>0{{ n + 1 }}</span>{{ item }}</div>
</div>
</div>

<p class="bottom-thought">模型提出建议，人把建议变成行动。</p>

<!--
你找代码、贴给模型。模型给建议，你改文件、运行测试，再把报错贴回去。每一步仍然依赖人搬运。
这是一条由人维持的工作循环。要让系统多做一些，先把人的实际操作变成可以调用的工具。
这是工作方式示意，不是某款产品的协议。
-->

---
name: tools
class: talk-code
clicks: 2
---

<h1>把操作，交给工具。</h1>
<div class="slide-lead">从一段回答，到一个可以执行的请求。</div>

<div class="code-composition">
<div class="code-work">
<div class="code-filename">harness.ts</div>

````md magic-move {duration:650}
```ts
const reply = await model(messages)
show(reply.text)
```
```ts
const reply = await model(messages)
const call = reply.toolCall
// read({ path: 'parser.mjs' })
```
```ts
const reply = await model(messages)
const call = reply.toolCall
const result = await tools.run(call)
```
````

<div class="pseudocode-note">职责伪代码，非 Pi API</div>
</div>
<div class="code-explanation">
<div :class="{ current: $clicks === 0 }"><span>01</span><b>模型给出回答</b></div>
<div :class="{ current: $clicks === 1 }"><span>02</span><b>模型提出请求</b></div>
<div :class="{ current: $clicks === 2 }"><span>03</span><b>宿主执行工具</b></div>
<p v-click="2">真实环境的变化<br>发生在执行这一侧。</p>
</div>
</div>

<!--
模型输出结构化的 read 请求，运行系统调用真正的读取函数。文件内容并非模型凭空知道。
同样的方法可以接 edit 和 bash，分别修改文件、运行命令。工具名称与参数因产品而异。
此页只讲请求如何走向真实动作。下一页再把结果接回来。
来源：Pi 固定版本 read.ts、agent-loop.ts，链接见 sources.md。
-->

---
name: feedback
class: talk-code talk-feedback
clicks: 2
---

<h1>再把结果，交回模型。</h1>
<div class="slide-lead">下一步，开始有了实际依据。</div>

<div class="code-composition">
<div class="code-work">
<div class="code-filename">harness.ts</div>

````md magic-move {duration:650}
```ts
const reply = await model(messages)
const result = await tools.run(reply.toolCall)
```
```ts
const reply = await model(messages)
const result = await tools.run(reply.toolCall)
messages.push(reply)
messages.push(toolResult(result))
```
```ts
while (true) {
  const reply = await model(messages)
  if (!reply.toolCall) break

  const result = await tools.run(reply.toolCall)
  messages.push(reply, toolResult(result))
}
```
````

<div class="pseudocode-note">省略校验、错误、取消与其他停止条件</div>
</div>
<div class="feedback-copy">
<span class="feedback-word">{{ ['执行', '反馈', '继续'][$clicks] }}</span>
<p>{{ ['先拿到真实结果。', '把观察加入下一次输入。', '一次次调用，接成工作过程。'][$clicks] }}</p>
<div class="small-evidence" v-click="1">例如：2 / 4 失败<br>空值调用 trim 报错</div>
</div>
</div>

<!--
关键的一步是结果回传：读完文件后重新调用模型，模型才知道实际实现；测试失败后把失败输出带回去，模型才有依据调整。
Harness 维护消息和运行循环，模型依据本轮输入生成下一步。得到工具请求就继续执行，再把结果接回来。
没有工具请求可以结束这一轮，但任务是否正确完成仍要看证据。也可能在需要澄清或遇到阻碍时停下。
来源：Pi 固定版本 agent-loop.ts；Codex as a platform；Claude Code how-it-works。
-->

---
name: replay
class: talk-demo
clicks: 7
---

<h1>看一次完整的修复。</h1>
<RepairReplay :step="$clicks" :active="$slidev.nav.currentPage === 6" @step="$slidev.nav.go(6, $event)" @next="$slidev.nav.nextSlide()" @previous="$slidev.nav.prevSlide(true)" />

<!--
用自动播放或方向键回放同一个任务：目标进入上下文，读取文件，测试失败，模型提出修改，宿主执行，复测，检查 diff，给出结论。
请听众注意：每一步模型并没有直接碰磁盘，Harness 调度的工具才产生实际动作。工具结果又驱动下一次生成。
这是人工编排的教学回放，不是实际 Pi 录屏，不会在页面调用模型或本机命令。通过数来自本地示例断言。
真正的 Pi 演示准备见 README，可在讲到第 10 页时切换。
-->

---
name: continuity
class: talk-memory
clicks: 2
---

<h1>长任务，需要把进度接上。</h1>
<div class="slide-lead">每次调用，都重新组织相关输入。</div>

<div class="memory-composition" :class="`memory-step-${$clicks}`">
<div class="history-fragments">
<span class="memory-label">工作历史</span>
<div v-for="(line, n) in ['目标：修复空值报错', 'read：读到实现', 'bash：2 / 4 失败', 'edit：补上空值处理', 'bash：4 / 4 通过']" :key="line" :style="{ '--n': n }"><span>0{{ n + 1 }}</span>{{ line }}</div>
</div>
<div class="progress-note"><span class="memory-label">进度摘要</span><b>空值处理已修复。</b><p>保留普通字符串的行为<br>下一步：检查 diff</p></div>
<div class="next-input"><span>下一次模型输入</span><div>目标与进度</div><div>近期工具结果</div></div>
</div>
<div class="memory-footnote">{{ ['完整历史可以保存。', '摘要保留目标、发现和进度，也可能丢失细节。', '必要时，重新读取原始证据。'][$clicks] }}</div>

<!--
一次模型生成结束后，持续工作的状态需要运行系统管理。下一次调用需要任务目标、已发现的事实和近期工具结果。
完整记录可以持久化，本轮输入按窗口和相关性取舍，长历史可以压缩。摘要可能丢失细节，必要时重读证据。
这里把上下文管理和会话保存合在一页，只解释为什么长任务能接续，不展开 token 预算、JSONL 或树结构。
来源：Pi 固定版本 sessions.md、compaction.md；Claude Code how-it-works。
-->

---
name: reach
class: talk-reach
clicks: 2
---

<h1>工具，扩展行动半径。</h1>

<div class="reach-composition">
<div>
<Transition name="word-swap" mode="out-in"><div :key="$clicks" class="reach-word">{{ ['代码库', '浏览器', '业务系统'][$clicks] }}</div></Transition>
<div class="reach-example">{{ ['read / edit / bash', '观察页面，操作网页', '读取工单，调用业务接口'][$clicks] }}</div>
</div>
<p>同一个循环，<br>连接不同的环境。</p>
</div>
<div class="reach-index"><span v-for="(label, n) in ['代码', '网页', '业务']" :key="label" :class="{ current: $clicks === n }">{{ label }}</span></div>
<div class="bottom-note">实际可用工具依赖产品与配置，接入能力也需要可靠反馈。</div>

<!--
看起来无所不能的一个原因，是循环可以连接不同工具。终端能操作代码与进程，浏览器工具能观察和操作网页，业务接口能接入工单、文档与数据。
这只是可接入能力的示意，不表示每个产品都默认具备这些工具。模型是否能正确完成工作，还取决于其能力、上下文和反馈质量。
Skills、MCP、扩展等可以帮助提供方法或连接能力，此处不再逐个开章节。它们最后仍要服务于这个行动和反馈循环。
来源：Pi 固定版本 extensions.md；各产品公开工具与扩展资料，见 sources.md。
-->

---
name: control
class: talk-control
clicks: 2
---

<div class="section-label">连续执行，还需要边界</div>
<h1>能行动，<br>也要会停下。</h1>

<div class="control-rows">
<div :class="{ current: $clicks === 0 }"><span>执行前</span><b>检查范围与策略</b></div>
<div :class="{ current: $clicks === 1 }"><span>运行中</span><b>处理错误，支持取消</b></div>
<div :class="{ current: $clicks === 2 }"><span>结束时</span><b>看证据，判断是否完成</b></div>
</div>
<div class="bottom-note">具体能力取决于实现与配置。Pi 默认工具不等于全面权限沙箱。</div>

<!--
当系统可以连续行动，运行系统还要处理执行范围、批准策略、错误、取消和运行限制。具体限制能力取决于产品和配置。
Pi 核心工具不能描述为自带全面权限沙箱；扩展通常拥有宿主进程权限。环境隔离需要相应的实际设施。
不要把模型回复“完成了”等同于正确完成。复测输出和 diff 才是本例的验收证据。
来源：Pi coding-agent README、extensions.md；Codex as a platform。
-->

---
name: pi
class: talk-pi
clicks: 3
---

<div class="section-label">现在，给这套运行系统一个具体名字</div>
<div class="pi-composition">
<div><h1>Pi<span>.</span></h1><p>一个可以读懂的 Harness。</p></div>
<div class="pi-responsibilities">
<div v-for="(pair, n) in [['模型', '选择下一步'], ['Pi', '组织并调度'], ['工具', '接触真实环境'], ['结果', '回到模型输入']]" :key="pair[0]" :class="{ current: $clicks === n }"><span>{{ pair[0] }}</span><b>{{ pair[1] }}</b></div>
</div>
</div>
<div class="pi-tools">read <span>/</span> edit <span>/</span> bash</div>
<div class="bottom-note">可切换真实 Pi 演示，任务与准备步骤见 README。</div>

<!--
此处把已经讲清楚的机制落到 Pi：模型提出请求，Pi 组织调用与运行状态，read / edit / bash 等工具产生动作，结果接回模型。
不展开分包、事件类型和供应商协议。想读实现时再打开附录源码定位页。
可切换到真实 Pi 演示。完整提示词和准备步骤见 README，先在独立临时目录放入失败版本，不要覆盖仓库完成版本。
若没有模型连接，用前面的示意回放与附录本地用例继续。自然语言任务范围不是操作系统沙箱。
来源：Pi 固定版本 agent-loop.ts、tools/index.ts 与相关工具实现。
-->

---
name: products
class: talk-products
clicks: 2
---

<div class="section-label">把同一组问题，带到其他产品</div>
<h1>同一个模型，<br>为什么体验不同？</h1>
<div class="product-wordmark-row" v-click="1"><span>Codex</span><span>Claude Code</span><span>Pi</span><span>OpenCode</span></div>
<div class="product-insight" v-click="2">Harness 选择怎样组织上下文、工具、反馈与策略。</div>
<div class="bottom-note">这是公开职责的对照，不表示各家内部实现相同。</div>

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
class: talk-finale
clicks: 2
---

<div class="section-label">从对话，到行动</div>
<h1>让 AI<br>把事情<span>做下去</span>。</h1>
<div class="finale-formula" v-click="1">模型 <span>+</span> Harness <span>+</span> 工具与环境</div>
<div class="finale-proof" v-click="2">用证据判断完成。</div>

<!--
回扣最开始的对话：此前是人维持整个工作循环，现在由 Harness 把相当一部分步骤连接起来。
Agent 是整体，Harness 是其中组织上下文、工具调用、反馈与运行状态的部分。公式是职责示意，不是严格的充分条件定义。
可访问的工具与环境决定行动范围，模型能力和证据质量影响能否完成任务。持续运行不代表无限能力或保证成功。
主讲到此结束。后续四页是源码定位、实际用例、产品对照和来源，按提问选看。
-->

---
name: architecture
transition: none
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
transition: none
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
transition: none
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
transition: none
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
