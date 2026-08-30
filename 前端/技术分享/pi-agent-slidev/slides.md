---
theme: default
title: Pi Agent：从模型到可工作的系统
author: 内部学习分享
colorSchema: dark
aspectRatio: 16/9
transition: fade
mdc: true
---

<style>
:root { --slidev-theme-primary: #59d6b4; --ink: #f2f4f3; --muted: #aab7b4; --panel: #172321; --line: #35534c; --coral: #ff8f70; }
.slidev-layout { background: #0d1514; color: var(--ink); padding: 52px 72px; }
h1 { font-size: 52px; line-height: 1.08; letter-spacing: 0; }
h2 { font-size: 38px; line-height: 1.12; margin-bottom: 24px; letter-spacing: 0; }
h3 { font-size: 25px; }
p, li { font-size: 20px; line-height: 1.5; }
strong { color: #59d6b4; }
.eyebrow { color: var(--coral); font-size: 16px; letter-spacing: .08em; text-transform: uppercase; }
.muted { color: var(--muted); }
.accent { color: var(--coral); }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; align-items: start; }
.three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.rule { height: 1px; background: var(--line); margin: 20px 0 26px; }
.quote { border-left: 4px solid var(--coral); padding-left: 22px; color: #e7ecea; font-size: 29px; line-height: 1.3; }
.label { color: var(--muted); font-size: 15px; text-transform: uppercase; letter-spacing: .08em; }
.step { border-top: 2px solid #59d6b4; padding-top: 12px; }
.step b { color: #59d6b4; font-size: 24px; }
.small { font-size: 16px; line-height: 1.4; }
.slidev-code { font-size: 17px !important; line-height: 1.45 !important; }
table { font-size: 18px; }
th { color: #59d6b4; }
td, th { padding: 9px 13px !important; border-color: var(--line) !important; }
</style>

<!--
[Sources]
- https://github.com/earendil-works/pi
- https://pi.dev/docs/latest
-->

# Pi Agent：从模型到可工作的系统

<div class="mt-8 text-xl muted">一次工具调用，如何变成一次真实的工程行动</div>
<div class="absolute bottom-14 left-18 right-18 flex justify-between text-sm muted"><span>内部学习分享</span><span>2026</span></div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/agent
-->

---
layout: center
---

<div class="eyebrow">先记住这一句话</div>
<div class="quote mt-8 max-w-4xl">模型只负责提出下一步；真正让 Agent 工作的是<strong>工具、宿主和状态循环</strong>。</div>
<div class="mt-10 muted">今天不背 API，先学会追踪一次任务到底发生了什么。</div>

<!--
[Sources]
- https://github.com/earendil-works/pi
-->

---

# 听完后，你应该能回答三个问题

<div class="three-col mt-10"><div class="step"><b>01</b><p>Pi 是什么？它和普通聊天有什么不同？</p></div><div class="step"><b>02</b><p>一次 read / edit / bash 调用经过哪些边界？</p></div><div class="step"><b>03</b><p>如何用一个小任务验证 Agent 是否真的工作？</p></div></div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/agent
-->

---

# Agent loop：行动来自循环，而不是一句 Prompt

```mermaid
flowchart LR
  U[用户目标] --> M[模型推理]
  M -->|tool call| T[工具契约]
  T --> H[宿主执行]
  H --> O[结果 / 错误 / 权限提示]
  O --> M
  M -->|final answer| U
  classDef core fill:#172321,stroke:#59d6b4,color:#f2f4f3;
  classDef edge fill:#281b19,stroke:#ff8f70,color:#f2f4f3;
  class M,T,H,O core;
  class U edge;
```
<div class="mt-5 muted">模型没有直接拿到文件系统，它只能请求一个由宿主解释的工具。</div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/agent
-->

---

# Pi 不是一个“更聪明的模型”

<div class="two-col mt-8"><div>

```text
pi-ai
  └─ 统一不同模型供应商的调用

pi-agent-core
  └─ tool calling + state management

pi-coding-agent
  └─ 面向编码任务的 CLI 与默认工具

pi-tui
  └─ 终端交互层
```

</div><div><div class="label">一个实用的判断</div><p class="text-2xl mt-3">Pi 是<strong>可扩展的 harness</strong>：把模型、工具、状态、事件和交互接成一个可运行的系统。</p><div class="rule"></div><p class="muted small">学习入口应该是边界和事件，而不是功能清单。</p></div></div>

<!--
[Sources]
- https://github.com/earendil-works/pi
-->

---

# 把一次工具调用拆开看

<div class="grid grid-cols-5 gap-3 mt-10"><div class="step"><b>1</b><p class="small">模型选择工具</p><p class="muted small">名称 + 参数</p></div><div class="step"><b>2</b><p class="small">runtime 校验状态</p><p class="muted small">会话 / 上下文</p></div><div class="step"><b>3</b><p class="small">宿主执行</p><p class="muted small">文件 / 进程 / 网络</p></div><div class="step"><b>4</b><p class="small">结果回注</p><p class="muted small">stdout / diff / error</p></div><div class="step"><b>5</b><p class="small">模型继续循环</p><p class="muted small">修正或结束</p></div></div>
<div class="mt-10 quote">把第 3 步当成“魔法”，就是 Agent 系统最容易失控的地方。</div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/agent
-->

---

# 会话和状态：Agent 为什么能“记得刚才做了什么”

<div class="two-col mt-8"><div><div class="label">上下文中有什么</div><ul><li>用户消息与模型响应</li><li>工具调用及其返回结果</li><li>错误、取消和用户确认</li></ul></div><div><div class="label">调试时看什么</div><ul><li>当前 session 的事件顺序</li><li>工具参数和实际副作用</li><li>失败后是重试、修正还是结束</li></ul></div></div>
<div class="mt-8 muted small">“它为什么这样做”通常要从事件流回答，而不是从最后一句自然语言回答。</div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/agent
-->

---

# 安全边界：信任项目，不等于信任执行环境

<div class="two-col mt-8"><div><div class="label">默认工具带来的能力</div><ul><li>读取、写入、编辑文件</li><li>执行 shell 命令</li><li>观察输出并继续循环</li></ul></div><div><div class="label accent">系统仍然要额外决定</div><ul><li>文件、进程、网络和凭据隔离</li><li>哪些动作需要用户确认</li><li>超时、取消、审计和恢复</li></ul></div></div>
<div class="mt-8 quote">Project trust 不是 sandbox。权限和隔离属于宿主产品的责任。</div>

<!--
[Sources]
- https://github.com/earendil-works/pi
-->

---

# Demo：用一个小任务看完整因果链

<div class="two-col mt-8"><div><div class="label">用户目标</div><p class="text-2xl">“找出空输入时的崩溃原因，并修复它。”</p><div class="rule"></div><ol><li>读取相关文件</li><li>解释计划并展示 diff</li><li>执行一个定向测试</li><li>根据结果继续或结束</li></ol></div><div><div class="label">现场纪律</div><p>使用脱敏小项目；每次写入或命令执行都解释“谁批准、谁执行、结果回到哪里”。</p><div class="mt-8 p-5" style="background: var(--panel); border: 1px solid var(--line);"><span class="accent">Fallback</span><br />预录终端输出 + 静态 diff，不让网络或模型延迟决定分享是否成功。</div></div></div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/coding-agent
-->

---

# 用一个练习把概念变成经验

<div class="three-col mt-10"><div class="step"><b>读</b><p>只允许读取一个文件，先解释计划，不修改。</p></div><div class="step"><b>改</b><p>允许修改明确范围，检查 diff 是否符合计划。</p></div><div class="step"><b>跑</b><p>只运行一个定向命令，观察错误和下一轮决策。</p></div></div>
<div class="mt-10 muted">每轮都问：模型决定了什么？宿主执行了什么？状态如何变化？</div>

<!--
[Sources]
- https://github.com/earendil-works/pi/tree/main/packages/agent
-->

---

# 为什么这次用 Slidev 做分享

<div class="two-col mt-8"><div><ul><li>Markdown + Git，适合边学习边迭代</li><li>代码、Mermaid、点击动画和 live coding</li><li>Web 版保留交互，PDF 版用于兜底</li></ul></div><div><div class="label">交付策略</div><p><strong>现场：</strong>本地 Web 版 + 终端 Demo</p><p><strong>备份：</strong>导出 PDF</p><p><strong>存档：</strong><code>slides.md</code> 与 README</p></div></div>
<div class="mt-8 muted small">导出的 PPTX 每页是图片，交互不会保留；本次把 Web 版作为主版本。</div>

<!--
[Sources]
- https://sli.dev/guide/why
- https://sli.dev/guide/exporting
- https://sli.dev/guide/work-with-ai
-->

---

# 带走一张心智模型

```text
目标
  ↓
模型：提出下一步
  ↓
Agent runtime：维护状态、选择工具、推进循环
  ↓
宿主：执行并施加权限
  ↓
观察：结果、错误、diff、用户确认
  ↺
```
<div class="mt-8 quote">学习 Pi 的入口不是“它有多少功能”，而是“这一轮行动由谁决定、在哪里执行、如何被观察”。</div>

<!--
[Sources]
- https://github.com/earendil-works/pi
-->

---
layout: center
---

<div class="eyebrow">讨论</div>
# 现在看 Pi，<br />你会先追哪一条边界？
<div class="mt-8 muted">模型 · runtime · tool · host · permission · session</div>

<!--
[Sources]
- https://github.com/earendil-works/pi
-->
