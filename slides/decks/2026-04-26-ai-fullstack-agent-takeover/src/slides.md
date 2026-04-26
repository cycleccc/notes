---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
routerMode: hash
mdc: true
layout: center
glowSeed: 12
title: AI 全栈接管工作流分享
exportFilename: AI-Fullstack-Agent-Takeover-slidev-exported
monaco: true
---

<div class="section-chip mb-6">AI Agent Workflow / Fullstack Delivery</div>

<div class="text-5xl font-bold gradient-text mb-6">
AI 全栈接管工作流分享
</div>

<div class="text-xl opacity-80 mb-8 max-w-4xl mx-auto leading-relaxed">
从“AI 辅助开发”升级到“AI 默认接管，人类做方向与验收”
</div>

<div class="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-0>
    <div class="text-4xl mb-3">Plan</div>
    <div class="font-mono text-sm">Plan First</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-200>
    <div class="text-4xl mb-3">Exec</div>
    <div class="font-mono text-sm">Agent Execute</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-400>
    <div class="text-4xl mb-3">Gate</div>
    <div class="font-mono text-sm">Gate Verify</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-600>
    <div class="text-4xl mb-3">Judge</div>
    <div class="font-mono text-sm">Human Judge</div>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 opacity-70">
  <div class="text-sm">cycleccc</div>
  <div class="text-sm">•</div>
  <div class="text-sm">2026-04-26</div>
</div>

<!--
开场先定调：今天讲的不是“怎么提效”，而是“怎么接管”。
四个词 Plan/Exec/Gate/Judge 就是整场主线，后面每一页都围绕它展开。
这页控制在 30 秒，快速拉齐预期。
-->

---
layout: center
---

# 先定一个核心问题

<div class="grid grid-cols-1 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-8 rounded-2xl" transition duration-500>
    <div class="text-3xl font-semibold mb-4 gradient-text">这件事为什么还不能被 AI 全流程接管？</div>
    <div class="text-lg opacity-80 leading-relaxed">
      从这个问题出发，反推流程缺口、工具缺口、验证缺口。
    </div>
  </div>
</div>

<v-clicks>

- 不是“哪里能用 AI”，而是“哪里必须人做”。
- 目标不是写更快，而是把研发变成可委托流水线。
- 人从执行者切到：任务定义者 + 守门员。

</v-clicks>

<!--
这一页是价值观锚点，后面的方法论都来自这一个问题。
可以用一句话强调：把“能不能做”换成“为什么还做不了”。
讲完后过渡到“先改环境和工具”。
-->

---
layout: center
---

# 我的环境选择：为什么是 WSL

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-3">Windows + PowerShell 的痛点</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li>命令组合与自动化脚本不够顺手</li>
      <li>跨工具链衔接成本高</li>
      <li>对 Agent 的“可执行性”不友好</li>
    </ul>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-3">切到 WSL 后的变化</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li>Linux CLI 可覆盖几乎所有研发动作</li>
      <li>脚本化 + 编排更自然，Agent 接管率更高</li>
      <li>系统任务和开发任务统一在一套终端流里</li>
    </ul>
  </div>
</div>

<!--
这里建议加你个人对比体验，不讲抽象优劣。
核心结论：接管率先受环境限制，不先统一命令流，AI 很难稳定接管。
时长 40-50 秒。
-->

---
layout: center
---

# 工具分工：按任务类型选战场

<div class="grid grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">日常系统任务</div>
    <div class="text-sm opacity-80">例如清理 C 盘：让 AI 扫描、分析、执行，不再手动点软件</div>
  </div>
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">主开发流程</div>
    <div class="text-sm opacity-80">WSL + Codex CLI：默认入口，覆盖需求拆解到代码落地</div>
  </div>
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">复杂前端例外</div>
    <div class="text-sm opacity-80">VSCode 插件 + Playwright，更适合可视化回放和截图迭代</div>
  </div>
</div>

<div class="keyline mt-10 max-w-5xl mx-auto">
  结论：不是一个工具打天下，而是针对任务类型切换“最易接管”的工作面。
</div>

<!--
这页要把“工具崇拜”转成“任务导向分工”。
强调你不是只用 CLI，也不是只用 IDE，而是分层组合。
-->

---
layout: center
---

# 接管边界：四类任务怎么分

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-8">
  <div v-click="1" class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">后端开发</div>
    <div class="text-sm opacity-80">默认 AI Agent 端到端执行</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">Bug 修复</div>
    <div class="text-sm opacity-80">默认 AI Agent 主导，人工做回归确认</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">基建/工程化</div>
    <div class="text-sm opacity-80">高标准化任务，最适合批量接管</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-2">复杂前端交互</div>
    <div class="text-sm opacity-80">目前是主要瓶颈：AI 实现 80%，人做体验裁决</div>
  </div>
</div>

<div class="mt-8 max-w-6xl mx-auto">
  <div class="text-sm opacity-70 mb-2">当前接管热力（主观评估）</div>
  <div class="progress-track"><span style="width: 85%"></span></div>
</div>

<!--
这里给出你的“接管边界地图”。
接管不是全-or-无，而是可量化边界。
如果现场有人问“你是不是太激进”，用这页回应：我有边界，不是盲目自动化。
-->

---
layout: center
---

# 真实案例：重构 ai-studio 的两周

<div class="grid grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">不是卡在代码量</div>
    <div class="text-sm opacity-80">业务逻辑和接口实现并非主障碍</div>
  </div>
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">卡在像素级复刻</div>
    <div class="text-sm opacity-80">复杂 UI 状态和交互细节难以一次到位</div>
  </div>
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">结论</div>
    <div class="text-sm opacity-80">AI 瓶颈正在从“写代码”转向“精细体验还原”</div>
  </div>
</div>

<div class="keyline mt-10 max-w-5xl mx-auto">
  这次复盘最重要的产出不是“写完重构”，而是明确了下一步应该优先攻克的接管瓶颈。
</div>

<!--
这是全场最有说服力的一页，用真实经历替代抽象口号。
讲清楚两周里时间消耗在哪里，听众就会理解为什么你强调前端复杂交互是瓶颈。
-->

---
layout: center
---

# 工作流 v2：让 AI 真正可接管

<div class="grid grid-cols-2 gap-5 max-w-6xl mx-auto mt-4 items-start">
<div class="space-y-3 text-sm">
  <div v-click="1" class="step-card">
    <div class="font-mono text-xs opacity-60 mb-1">STEP 1</div>
    <div><span class="font-semibold">Plan</span>：先写 Goal / Context / Constraints / Done-When</div>
  </div>
  <div v-click="1" class="step-card">
    <div class="font-mono text-xs opacity-60 mb-1">STEP 2</div>
    <div><span class="font-semibold">Execute</span>：agent 先给计划，再执行编码</div>
  </div>
  <div v-click="1" class="step-card">
    <div class="font-mono text-xs opacity-60 mb-1">STEP 3</div>
    <div><span class="font-semibold">Verify</span>：类型检查、测试、构建、截图对比做硬闸门</div>
  </div>
  <div v-click="1" class="step-card">
    <div class="font-mono text-xs opacity-60 mb-1">STEP 4</div>
    <div><span class="font-semibold">Accept</span>：只在人必须判断的地方做人工验收</div>
  </div>
</div>

<div class="glass p-3 rounded-2xl">

```mermaid
%%{init: {"flowchart": {"nodeSpacing": 14, "rankSpacing": 12}, "themeVariables": {"fontSize": "11px"}} }%%
flowchart TD
  A[任务输入] --> B[结构化任务卡]
  B --> C[AI 计划]
  C --> D[AI 执行]
  D --> E[验证闸门]
  E -->|通过| F[人工终审]
  E -->|失败| C
```
</div>
</div>

<!--
这是“方法论落地页”，建议慢一点讲。
要强调 Verify 是中枢，不是附属步骤。
听众如果只带走一页，就该是这页。
-->

---
layout: center
---

# 附：怎么让 AI 用 Playwright 接管任务

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-8">
  <div class="glass p-5 rounded-2xl">
    <div class="font-semibold mb-2">1. 先给 AI 明确目标页</div>
    <div class="text-sm opacity-80">告诉它要对齐的页面、关键模块和优先级，先做结构和状态对齐，再做细节。</div>
  </div>
  <div class="glass p-5 rounded-2xl">
    <div class="font-semibold mb-2">2. 让 AI 自己跑一遍用户路径</div>
    <div class="text-sm opacity-80">按真实用户步骤走流程，记录每一步结果和失败点，不要只看最终页面。</div>
  </div>
  <div class="glass p-5 rounded-2xl">
    <div class="font-semibold mb-2">3. 每次功能完成都做点击回归</div>
    <div class="text-sm opacity-80">固定检查关键路径：进入、输入、提交、结果反馈，确保新功能没破坏主流程。</div>
  </div>
  <div class="glass p-5 rounded-2xl">
    <div class="font-semibold mb-2">4. 每次修 bug 都沉淀为长期检查</div>
    <div class="text-sm opacity-80">把这次问题转成可重复验证项，下次同类改动自动检查，避免回归。</div>
  </div>
</div>

<div class="keyline mt-8 max-w-5xl mx-auto">
  你的角色：定义验收标准和关键路径；AI 的角色：执行浏览器操作、产出证据、反复修到通过。
</div>

<!--
这页只做补充，不打断主线。
-->

---
layout: center
---

# 现在就能落地的 3 个优化

<div class="grid grid-cols-3 gap-5 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-5 rounded-2xl">
    <div class="text-xl font-semibold mb-2">1. 任务卡模板化</div>
    <div class="text-sm opacity-80">不再“口头描述需求”，全部结构化输入 agent</div>
  </div>
  <div v-click="1" class="glass p-5 rounded-2xl">
    <div class="text-xl font-semibold mb-2">2. 建立验收闸门</div>
    <div class="text-sm opacity-80">测试/类型检查/截图对比不过，就不算完成</div>
  </div>
  <div v-click="1" class="glass p-5 rounded-2xl">
    <div class="text-xl font-semibold mb-2">3. 维护接管清单</div>
    <div class="text-sm opacity-80">持续更新“已可全接管 / 部分接管 / 暂不接管”任务池</div>
  </div>
</div>

<!--
这页是行动清单，讲法尽量“明天就能做”。
每一点都可以给一句你自己的当前实践状态。
-->

---
layout: center
---

# 结束页：一句话带走

<div class="max-w-5xl mx-auto mt-12">
  <div class="glass p-8 rounded-2xl">
    <div class="text-3xl font-bold gradient-text mb-4">
      默认让 AI 接管，持续缩小“必须人做”的范围。
    </div>
    <div class="text-lg opacity-80 leading-relaxed">
      人类工程师的核心价值，正在转向：定义问题、设置约束、构建验证系统、做最终裁决。
    </div>
  </div>
</div>

<div class="abs-br m-6 text-sm opacity-70">
Q&A
</div>

<!--
收尾不要再展开新信息，回到开场主张形成闭环。
最后停 2 秒进入问答。
-->
