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

<div class="cover-deck">以 Pi 为例，理解 Coding Agent 的运行原理</div>
<div class="cover-signature">工具 · 反馈 · 上下文 · 执行边界</div>

<!--
**本页目标｜约 1 分钟**

用一个问题开场，让大家带着疑问看后面的例子。

**开场可以这样说**

“同样是问 AI，为什么有时得到一段建议，有时它却能自己读文件、修改代码，再跑测试？今天我们以 Pi 为例，把中间发生的事情拆开。”

先约定两个词：Agent 是围绕目标执行任务的整套系统。Harness 是模型外围组织工作过程的运行系统。模型负责理解输入、生成下一步，Harness 把输入、工具和结果连接起来。

**操作**

本页没有分步动画，讲完再翻页。先不展开各产品，也不用提前解释所有术语。

**过渡**

“先从一个大家都做过的小任务开始：修一个空值报错。”

**来源备查，不用念**

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
**本页目标｜约 1 分钟**

让听众区分“得到建议”和“任务产生实际结果”。

**按画面讲**

- 初始：读出任务。“这里的 parser 本来会去掉字符串两端的空白，但遇到 undefined、null 就报错。我们希望修好它，同时保留普通字符串的行为。”
- 点击 1，出现“实际修改”：“我们期待的，是文件真的改好了。”
- 点击 2，出现“文件改变了，测试也通过了”：“还要有验证结果，不能只听一句‘已经完成’。”这里说的是验收目标，尚未展示执行。

**讲解提醒**

带工具的聊天应用也能做这些事，不能仅凭聊天窗口或终端界面判断它是不是 Agent。

**过渡**

“如果模型只给出建议，中间这些操作是谁完成的？”
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
**本页目标｜约 1 分 30 秒**

先讲清人原本承担的循环，后面再看哪些工作交给运行系统。

**按高亮讲**

- 初始，找代码：“你先找到文件，把相关代码交给模型。”
- 点击 1，改文件：“模型给出建议，你复制、调整，再写回项目。”
- 点击 2，跑测试：“你执行命令，观察是否仍然报错。”
- 点击 3，贴回结果：“把输出带回对话，模型才有依据继续建议。”

收一句：“现在是人在维持整个工作循环。模型的一次回答，并没有自动完成后面的操作。”

**过渡**

“先把这些实际操作变成模型可以请求调用的工具。”
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
**本页目标｜约 2 分钟**

把模型生成请求与宿主执行动作分开。

**按代码变化讲**

- 初始，普通回答：“调用模型，把返回的文字展示出来，到这里就结束了。”只指 model 和 show 两行。
- 点击 1，工具请求：“支持工具调用的模型还可以返回工具名和参数。这里请求 read，路径是 parser.mjs。此时磁盘还没有被读取。”
- 点击 2，执行工具：“Harness 收到请求，调用已注册的工具实现。真正的文件读取发生在 tools.run 这一侧。”

此处把宿主解释为运行这些工具代码的程序。read 可以读取文件，edit 可以修改文件，bash 可以执行命令。模型通过请求间接使用这些能力。

**讲解提醒**

左边是职责伪代码，非 Pi API，也省略了许多实际分支。本页先不展开循环。

**过渡**

“读完文件后，模型怎样知道读到了什么？还需要把结果送回去。”

**来源备查，不用念**

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
<div class="small-evidence" v-click="1">测试发现：空值输入报错<br>undefined / null 无法调用 trim</div>
</div>
</div>

<!--
**本页目标｜约 2 分 30 秒**

讲清工具结果怎样成为下一次行动的依据，以及循环为什么能继续。

**按代码变化讲**

- 初始，执行：“工具拿到了真实内容或命令输出，但模型还需要在后续输入里看到它。”
- 点击 1，反馈：“把模型的请求和工具结果一起放入消息历史。比如测试返回 undefined、null 调用 trim 报错，这些信息就成为新的依据。”这里的测试报错是同一修复案例的反馈示例，不是本段代码当场运行的结果。
- 点击 2，继续：“再调用模型。模型可以请求下一步工具，Harness 执行后再带回结果，这样接成工作循环。”沿着 while 中的几行解释一次即可。

**关键一句**

真实模型接入时，下一步由模型依据当前输入生成，Harness 不必写死整条修复路线。反馈改变的是下一次输入，模型并没有在现场重新训练。

没有新的工具请求可以结束这一轮，但结束不等于正确完成，也可能需要询问用户或报告阻碍。这里省略了校验、错误处理、取消和其他停止条件。

**过渡**

“把这几行代码放回任务里，看一次完整过程。”

**来源备查，不用念**

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
**本页目标｜约 3 分钟**

用同一个任务串起完整过程。本页负责建立直觉，第 12 页只核对 Pi 核心的实际运行。

**操作**

优先用方向键逐步讲，页面序号 01–08 分别对应初始与 7 次点击。自动播放每步约 2.6 秒，适合先看一遍再回看，讲解时可暂停。不要一边自动播放一边追着逐句解释。

**按步骤讲**

- 初始／01 目标：“修复空值输入，同时保留普通字符串的 trim 行为。”
- 点击 1／02 read：“模型请求读取，工具返回实际代码。”
- 点击 2／03 bash：“四个用例中两个通过。失败的是 undefined、null，空字符串和普通字符串通过。2/4 是通过数。”
- 点击 3／04 model：“根据代码和报错，提出用 ?? 处理空值的修改请求。请求本身还没有改动文件。”
- 点击 4／05 edit：“宿主执行后，右侧代码才改变。此时还没复测，不能提前说修复成功。”
- 点击 5／06 bash：“重新运行同一组验收，四个约定输入均通过。”
- 点击 6／07 diff：“检查修改范围，确认没有顺手改动其他文件。”
- 点击 7／08 done：“最后才能引用测试和差异，给出修复结论。”

**必须说明**

这是人工编排的教学回放，页面不调用模型、不执行本机命令。通过数依据本地示例断言，也只覆盖这四个输入。

**过渡**

“小任务能这样循环。任务变长后，系统怎样接上前面的进度？”
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
<div v-for="(line, n) in ['目标：修复空值报错', 'read：读到实现', 'bash：空值输入报错', 'edit：补上空值处理', 'bash：四个用例均通过']" :key="line" :style="{ '--n': n }"><span>0{{ n + 1 }}</span>{{ line }}</div>
</div>
<div class="progress-note"><span class="memory-label">进度摘要</span><b>空值处理已修复。</b><p>保留普通字符串的行为<br>下一步：检查 diff</p></div>
<div class="next-input"><span>下一次模型输入</span><div>目标与进度</div><div>近期工具结果</div></div>
</div>
<div class="memory-footnote">{{ ['完整历史可以保存。', '摘要保留目标、发现和进度，也可能丢失细节。', '必要时，重新读取原始证据。'][$clicks] }}</div>

<!--
**本页目标｜约 2 分钟**

区分保存的工作历史与每次真正送入模型的上下文。

**按画面讲**

- 初始，工作历史：“前面读了什么、发现什么、改了什么，都可以留下记录。”
- 点击 1，收拢成摘要：“历史变长后，可以把目标、发现和当前进度整理成摘要。这里保留了空值已修复、普通行为要保留、下一步检查 diff。”
- 点击 2，下一次输入：“下一次调用重新组织目标、进度和近期工具结果，让模型接着做。”

**关键一句**

保存过的信息不一定全部进入本轮输入。上下文窗口有限，摘要也可能丢失细节，需要时要重新读取原始证据。

图里是职责示意，不表示每一次工具调用后都会立刻压缩，也不表示模型天然永久记住了项目。

**过渡**

“循环接上了，工具又能把它带到哪些环境里？”

**来源备查，不用念**

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
**本页目标｜约 1 分钟**

解释能力范围为什么会扩展，保持同一个运行机制。

**按环境切换讲**

- 初始，代码库：“read、edit、bash 让系统能读代码、改文件和测试。”
- 点击 1，浏览器：“换成页面观察和网页操作工具，就能在网页上执行任务。”
- 点击 2，业务系统：“接入工单或业务接口，又能处理对应业务。”

“变化的是工具和可接触的环境，行动与反馈循环仍然相似。工具接得更多，并不保证模型每次都能正确完成。”

**备查，不主动展开**

Skills 可以提供任务方法，MCP 或扩展可以连接能力。各产品实际支持什么，以实现和配置为准。

**过渡**

“既然工具可以产生真实影响，连续执行还需要哪些边界？”

**来源备查，不用念**

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
**本页目标｜约 2 分钟**

说明能持续行动还需要执行约束与结束判断。

**按高亮讲**

- 初始，执行前：“要检查请求是否在允许范围内，是否需要批准。自然语言里说‘只改这个文件’，本身不构成操作系统隔离。”
- 点击 1，运行中：“命令可能失败、卡住，用户也可能取消。运行系统需要按实现处理这些情况，保留有用的错误信息。”
- 点击 2，结束时：“模型说完成了，仍要对照验收。这个例子看实际测试输出和 diff。”

**边界说明**

这是 Harness 通常需要处理的职责，具体能力依产品、配置和环境而定。Pi 默认工具不能当作自带全面权限沙箱，扩展通常拥有宿主进程权限。

**过渡**

“现在这些职责已经清楚了，我们看一个能沿源码读懂的具体实现：Pi。”

**来源备查，不用念**

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
<div class="bottom-note">接下来，沿一次 read 请求找到源码，再运行同一个修复任务。</div>

<!--
**本页目标｜约 1 分钟**

把前面讲的共同职责映射到 Pi，不再从头介绍一套新概念。

**按高亮讲**

- 初始，模型：“依据当前输入，生成下一步请求。”
- 点击 1，Pi：“组织上下文，维护运行过程，调度工具。”
- 点击 2，工具：“read、edit、bash 的实现接触文件和命令环境。”
- 点击 3，结果：“真实输出回到后续模型输入，循环继续。”

**操作提醒**

本页继续翻到第 11 页，再看第 12 页核心实验。不在这里切换终端。完整 Pi 真实模型演示是可选项，只有事先决定加入并准备好，才放在第 12 页之后。

**过渡**

“沿一次 read 请求，看看这些职责在 Pi 里对应什么字段和代码。”

**来源备查，不用念**

来源：Pi 固定版本 agent-loop.ts、tools/index.ts 与相关工具实现。
-->

---
name: pi-call
class: talk-code talk-pi-call
clicks: 3
---

<h1>一次 read，在 Pi 里怎样发生？</h1>
<div class="slide-lead">工具定义进入输入，请求与结果用同一个 ID 对上。</div>

<div class="code-composition">
<div class="code-work">
<div class="code-filename">{{ ['提供给模型的工具定义（字段示例）', '模型返回的 Pi 内部消息（字段示例）', 'agent-loop.ts（关键节选，省略周边代码）', 'Pi 构造的结果消息（字段示例）'][$clicks] }}</div>

````md magic-move {duration:650}
```ts
{
  name: 'read',
  description: '读取文件内容',
  parameters: {
    type: 'object',
    properties: { path: { type: 'string' } },
    required: ['path']
  }
}
```
```ts
{
  role: 'assistant',
  content: [{
    type: 'toolCall', id: 'call_1',
    name: 'read',
    arguments: { path: 'parser.mjs' }
  }]
}
```
```ts
// prepareToolCall：按名称定位、校验参数
const tool = tools.find((t) => t.name === toolCall.name);
const validatedArgs = validateToolArguments(tool, preparedToolCall);

// 后续执行阶段调用 prepared.tool.execute(...)
// read 的实现才会真正读取磁盘
```
```ts
{
  role: 'toolResult',
  toolCallId: 'call_1',
  toolName: 'read',
  content: [{ type: 'text', text: '文件内容…' }],
  isError: false
}
// 加入 messages，供下一次模型调用使用
```
````

<div class="pseudocode-note">字段示例已省略非关键项；内部消息由 pi-ai 适配到供应商协议。</div>
</div>
<div class="pi-call-copy">
<span class="pi-call-word">{{ ['定义', '请求', '执行', '反馈'][$clicks] }}</span>
<p>{{ ['模型拿到工具名称、用途和参数约束。', '模型选择 read，给出路径和调用 ID。', 'Pi 找到工具实现，校验通过后调用它。', 'call_1 的文件内容，成为下一步的依据。'][$clicks] }}</p>
<a :href="'https://github.com/earendil-works/pi/blob/d5b3de22d0e24a3e9c38a9410d3329b099717283/packages/agent/src/agent-loop.ts#L' + [412,268,726,940][$clicks]" target="_blank">查看对应源码 ↗</a>
</div>
</div>

<!--
**本页目标｜约 2 分 30 秒**

只抓工具定义、调用 ID 和结果回传，不逐行朗读源码。

**按四个状态讲**

- 初始，定义：“模型为什么知道有 read？因为可用工具的名称、用途和参数约束进入了输入。这里 path 必须是字符串。”
- 点击 1，请求：“模型返回 toolCall，选择 read，给出路径。记住 call_1，它用于把这次请求和后面的结果对上。”
- 点击 2，执行：“Pi 按名称找到工具，验证参数，然后在执行阶段调用对应实现。真正读取磁盘的是 read 实现。”只指 tools.find、validateToolArguments 和 execute 注释。
- 点击 3，反馈：“Pi 把内容包成 toolResult，toolCallId 仍是 call_1。把结果加入消息后，下一次模型调用才有这份内容作为依据。”

**讲解提醒**

定义、请求和结果是按源码字段编写的教学示例。执行页是同一函数中不同位置的关键节选，省略了错误、Hook、中止等分支，不能直接复制成独立函数。

这些是 Pi 内部表示，供应商协议由 pi-ai 适配。默认不点源码链接，以免打断节奏，提问时再打开。

**过渡**

“字段能对上还不够，接下来用真实 Pi 核心跑一遍，核对结果有没有回到下一次输入。”

**来源备查，不用念**

来源：agent-loop.ts L268、L283–285、L412、L726–737、L842、L940；types.ts AgentTool；read.ts。详见 sources.md。
-->

---
name: pi-runtime
class: talk-runtime
clicks: 4
---

<h1>让 Pi 的循环，真正跑一次。</h1>
<PiRuntimeProof :step="$clicks" />

<!--
**本页目标｜约 3 分钟**

验证运行机制，重点看工具结果与循环计数，避免重复第 6 页的完整故事。

**先说明实验边界**

“这里是已保存的本地运行记录。实际 Pi core 1.4.0 负责调度，模型回复由脚本预设，read、edit、bash 是精简自定义教学工具。文件读写和 Node 测试真实发生在独立临时目录。”网页本身只展示记录。

**按五个状态讲**

- 初始，读取实现：“call_1 返回真实文件内容。脚本检查下一次调用确实拿到了这个工具结果。”
- 点击 1，复现报错：“call_2 返回失败输出，2/4 通过。这份报错也进入下一次输入。”
- 点击 2，执行修改：“call_3 对临时文件执行修改，返回 Updated parser.mjs。”
- 点击 3，再次验证：“call_4 重跑同一验收，4/4 通过，脚本还核对最终文件差异。”
- 点击 4，本轮结束：“共 5 次模型调用入口，其中回复是预设的。前 4 次请求工具，第 5 次返回最终文字，所以工具执行 4 次，最后收到 agent_end。”

**关键一句**

这个实验验证 Pi 的参数校验、工具执行和结果回注，没有验证模型自主规划或纠错。真实模型接入后，每一步请求才由模型根据实际输入生成。

**操作与衔接**

默认继续第 13 页。只有事先决定加入且配置好模型，才在此切换真实 Pi 会话，观察“请求了什么、返回了什么、下一步如何变化”，准备见 README。

如果听众要求复现，可在此草稿目录的终端运行 `pnpm --dir demo/pi-runtime demo`。它无需模型，依赖须提前安装。终端会给出完整 report.json 路径。运行失败就保留报错，继续展示已保存记录，不把它称为本次现场成功。

**来源备查，不用念**

来源：demo/pi-runtime/run.mjs、result.json、独立 pnpm-lock.yaml。页面只展示记录，不运行本机命令。
-->

---
name: products
class: talk-product-choices
clicks: 3
---

<h1>同一套职责，各家怎样组织？</h1>
<div class="slide-lead">沿着工具、上下文与执行边界，看公开设计。</div>

<div class="product-choices">
<div class="choices-head"><span>产品</span><span>公开设计入口</span><span>怎样影响任务执行</span></div>
<div v-for="(row, n) in [['Pi', '核心循环 + 工具与扩展', '把循环嵌入自己的工具和界面'], ['Codex', 'Harness + 沙箱与批准策略', '按配置与运行环境约束操作'], ['Claude Code', '收集上下文 → 行动 → 验证', '围绕项目持续获取并验证信息'], ['OpenCode', '主 Agent / 子 Agent + 权限', '按任务配置角色与工具访问']]" :key="row[0]" class="choices-row" :class="{ current: $clicks === n, past: $clicks > n }"><b>{{ row[0] }}</b><span>{{ row[1] }}</span><span>{{ row[2] }}</span></div>
</div>
<div class="choices-takeaway">模型决定下一步；Harness 决定这一步怎样落地。</div>
<div class="bottom-note">这些侧重点并非各家独有，也不表示内部实现相同。效果仍取决于模型、任务与配置。</div>

<!--
**本页目标｜约 1 分 30 秒**

帮助听众把共同原理迁移到熟悉的产品，不做性能排名。

**按高亮讲，每行一句即可**

- 初始，Pi：“核心循环可以组合工具，也能嵌入自己的程序和界面。”
- 点击 1，Codex：“公开设计把上下文、工具、状态与执行策略放在 Harness 中，沙箱和批准行为依配置及运行环境而定。”
- 点击 2，Claude Code：“用收集上下文、行动、验证来解释工作循环，可以和刚才的例子对应起来。”
- 点击 3，OpenCode：“把主 Agent、子 Agent、模型及工具权限作为可配置入口，按任务组织角色。”

收一句：“模型决定下一步，Harness 决定这一步怎样落地。”这句话概括主要分工，最终效果仍取决于两者及环境。

**讲解提醒**

每行选取一个公开设计入口。这些能力可能重叠，不能据此声称某能力由某家独有，也不能推断内部实现完全相同。细节问答再看附录。

**过渡**

“回到开头：从一段建议到实际行动，中间补上的是什么？”

**来源备查，不用念**

来源：2026-10-31 核对的 Codex as a platform、How Claude Code works、OpenCode Agents；Pi 固定版本文档。见 sources.md。
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
**本页目标｜约 1 分钟**

回扣开场，结束主讲，让听众带走明确的分工。

**按画面收束**

- 初始：“开头是人把建议变成操作，再把结果贴回来。现在 Harness 把其中相当一部分步骤连接起来，让 AI 能把事情继续做下去。”
- 点击 1，出现组合：“模型生成下一步，Harness 组织运行，工具接触环境。三者共同构成我们刚才看到的工作系统。”公式是职责示意，不是保证成功的充分条件。
- 点击 2，出现验收：“最后用证据判断完成。模型的结论需要实际输出支撑，测试本身也有覆盖范围。”

**结束可以这样说**

“理解一个 Coding Agent，可以问：谁决定下一步，谁执行，结果怎样回来，进度怎样接上，最后凭什么说完成。”

主讲到此结束，停下来接提问。后面四页是按需使用的附录，不默认全部继续播放。
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
**本页用途｜可选，约 1–2 分钟**

有人问“Pi 的源码应该从哪里读”时使用，不计入主讲时长。

**按层显露讲**

- 初始，pi-coding-agent：“具体的编码工具、会话和扩展在这一层找。”
- 点击 1，pi-agent-core：“想看消息、运行循环和事件，从这里进入。正文展示的 agent-loop.ts 属于这一层。”
- 点击 2，pi-ai：“连接不同模型与提供商的协议适配在这里。”
- 点击 3，pi-tui：“它提供终端交互组件，负责界面基础设施。”

**讲解提醒**

图按职责组织，不是每次模型请求的严格调用栈。tui 不在每次调用模型的必经路径上，上层也可以直接使用模型层能力。

**衔接**

回答源码问题后可回到提问。若追问修复结果如何验证，再看下一页用例。

**来源备查，不用念**

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
**本页用途｜可选，约 1–2 分钟**

有人追问“2/4 是什么、修复前后究竟有什么不同”时使用。

**按画面讲**

- 初始：“右侧在浏览器实际计算四个输入。undefined、null 抛 TypeError，空字符串和普通字符串通过，所以是 2/4 通过。”
- 点击 1：“先用 ?? 把 null、undefined 变成空字符串，再 trim。现在这四个输入均符合期望，得到 4/4。”

“这四个断言只证明约定输入的行为，不能据此声称任何类型输入都已覆盖。测试检查行为，diff 检查修改范围。”

**可选终端操作**

工作目录：仓库的 `slides/drafts/pi-agent`。不需要网络或模型，依次运行：

```bash
node demo/check.mjs before
node demo/check.mjs
```

第一条预期 2/4 通过、退出码 1，这是预期的失败版本。第二条预期 4/4 通过、退出码 0。这两个命令分别验证已有的前后版本，不会让 Pi 修改文件。

**衔接**

验证问题回答完即可回到提问。若问“实际修改怎样发生”，回到第 12 页运行记录。
-->

---
name: comparison
transition: none
---

# 附录：四款产品的公开设计

<ProductLens />

<!--
**本页用途｜可选，约 1–2 分钟**

有人想进一步比较产品时使用，沿模型接口、运行系统和行动入口看共同职责。

**操作与讲法**

本页没有方向键分步动画。用鼠标点击页内的产品按钮切换，方向键会翻页。

- 默认 Pi：“pi-ai 连接模型，pi-agent-core 组织循环，coding-agent 提供编码工具。pi-ai 是适配层，不是模型本身。”
- 点击 Codex：“看会话、运行事件和执行策略如何作为运行系统的入口，具体边界取决于配置和环境。”
- 点击 Claude Code：“用收集上下文、行动和验证解释循环，工具与上下文管理位于模型外围。”
- 点击 OpenCode：“看主 Agent、子 Agent 以及工具权限怎样按任务配置。”

只切换听众问到的产品，不必再完整讲一遍第 13 页。图中箭头表示职责关系，不是精确的时序或所有产品共用的内部协议。

**边界与衔接**

不做能力排他性排名，不推断闭源模型训练与未公开的服务实现。需要具体依据时再打开下一页的官方资料。

**来源备查，不用念**

来源：https://developers.openai.com/blog/codex-as-a-platform
https://code.claude.com/docs/en/how-claude-code-works
https://opencode.ai/docs/agents/
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

<p class="muted small mt-6">补充核对：2026-10-31。Pi 固定到 d5b3de22，详细索引见 sources.md。</p>

<!--
**本页用途｜可选，约 30 秒**

作为会后阅读和问答查证入口，不逐条朗读链接。

**可以这样介绍**

“想系统学习，可以沿教程读下去。想核对今天涉及的具体机制，可以从 Pi 固定版本的 agent-loop.ts、工具实现和会话文档开始。其他产品则看各自的官方工作原理。”

**操作**

只有听众追问某项依据时，才点击对应链接。Pi 源码固定到 d5b3de22，补充核对日期是 2026-10-31，后续版本可能变化。更详细的索引在本稿 sources.md。

**备查**

教程用于学习路线，API 与具体行为以官方源码为准。OpenCode 使用 /docs/ 文档口径，不混用 /v2/docs/ 的配置字段。

**结束**

“今天先抓住行动与反馈这个循环。有了这个基础，再看 Skills、MCP、会话树或多 Agent，就更容易知道它们补在哪个位置。”
-->
