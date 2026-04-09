---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
routerMode: hash
mdc: true
layout: center
glowSeed: 11
title: TanStack 全家桶技术分享
exportFilename: TanStack-Family-slidev-exported
monaco: true
---

<div class="text-5xl font-bold gradient-text mb-6">
TanStack 全家桶技术分享
</div>

<div class="text-xl opacity-80 mb-10">
“从路由、服务端状态到表格与表单，把 React 应用的核心地基拆成一套可组合工具箱”
</div>

<div class="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-0>
    <div class="text-4xl mb-3">🚀</div>
    <div class="font-mono text-sm">TanStack Start</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-200>
    <div class="text-4xl mb-3">🧭</div>
    <div class="font-mono text-sm">Router</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-400>
    <div class="text-4xl mb-3">⚡</div>
    <div class="font-mono text-sm">Query</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-600>
    <div class="text-4xl mb-3">🧱</div>
    <div class="font-mono text-sm">Table</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-800>
    <div class="text-4xl mb-3">📝</div>
    <div class="font-mono text-sm">Form</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-1000>
    <div class="text-4xl mb-3">📏</div>
    <div class="font-mono text-sm">Virtual</div>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 opacity-70">
  <div class="text-sm">cycleccc</div>
  <div class="text-sm">•</div>
  <div class="text-sm">2026-03-06</div>
</div>

---
layout: center
---

# 今天聊什么

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-1">🧭 产品地图</div>
    <div class="text-sm opacity-75">TanStack 到底不只是 Query</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-1">🏗️ 核心分层</div>
    <div class="text-sm opacity-75">路由、异步状态、视图模型、交互层</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-1">🧩 组合方式</div>
    <div class="text-sm opacity-75">Start / Router / Query / Table / Form / Virtual</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-1">📌 落地建议</div>
    <div class="text-sm opacity-75">什么时候值得上，什么时候不要硬上</div>
  </div>
</div>

---
layout: center
---

# 什么是 TanStack 全家桶？

<v-clicks>

- 它不是“一整个大框架”，而是一组 **可独立采用、也可叠加组合** 的工具。
- 最常被认到的是 **TanStack Query**，但现在主线已经扩展到多条产品线。
- **Start**：全栈 React 框架入口
- **Router / Query**：页面导航与服务端状态
- **Table / Form / Virtual**：复杂界面模型层
- **Store / Pacer / DB / Devtools / Config**：补强本地状态、交互节奏、数据建模与调试体验

</v-clicks>

---
layout: center
---

# 为什么很多团队会从 Query 继续扩到全家桶？

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">✅ 心智统一</div>
    <div class="text-sm opacity-80 leading-relaxed">
      路由、缓存、表格、表单都走 headless + typesafe 的同一套设计语言，团队切换成本低。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">🧷 组合灵活</div>
    <div class="text-sm opacity-80 leading-relaxed">
      不强绑 UI 组件库，不强绑后端协议；你可以接 React、接 design system、接 REST / GraphQL / tRPC。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-2">⚡ 性能默认值更好</div>
    <div class="text-sm opacity-80 leading-relaxed">
      缓存、预取、虚拟列表、按需渲染都不是“后补救”，而是被设计进日常开发流。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-2">🛡️ 复杂场景更稳</div>
    <div class="text-sm opacity-80 leading-relaxed">
      真正吃到红利的通常不是 demo，而是搜索页、数据表格页、运营后台、长表单、无限列表这类麻烦场景。
    </div>
  </div>
</div>

---
layout: two-cols-header
---

# 一张图看懂 TanStack 的分层

::left::

<div class="space-y-4 mt-8">
  <div v-click="1" class="stack-layer">
    <div class="text-sm uppercase tracking-wide opacity-60 mb-2">App Shell</div>
    <div class="text-2xl font-strong gradient-text">Start / Router</div>
    <div class="text-sm opacity-80 mt-2">页面组织、URL 状态、loader、SSR / streaming 入口</div>
  </div>
  <div v-click="1" class="stack-layer">
    <div class="text-sm uppercase tracking-wide opacity-60 mb-2">Async State</div>
    <div class="text-2xl font-strong gradient-text">Query</div>
    <div class="text-sm opacity-80 mt-2">请求、缓存、失效、重试、预取、乐观更新</div>
  </div>
  <div v-click="1" class="stack-layer">
    <div class="text-sm uppercase tracking-wide opacity-60 mb-2">View Models</div>
    <div class="text-2xl font-strong gradient-text">Table / Form / Virtual</div>
    <div class="text-sm opacity-80 mt-2">复杂组件不再塞业务逻辑，模型层和 UI 层分离</div>
  </div>
</div>

::right::

<div class="grid grid-cols-2 gap-4 mt-8">
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">Store / Pacer</div>
    <div class="text-sm opacity-80">本地状态与交互节奏控制，给界面层粘合剂补位</div>
  </div>
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2">DB / Config / Devtools</div>
    <div class="text-sm opacity-80">更靠近数据建模、工程配置和可视化调试的扩展层</div>
  </div>
  <div v-click="2" class="glass p-5 rounded-2xl col-span-2">
    <div class="text-lg font-semibold mb-2">一句话</div>
    <div class="text-sm opacity-80 leading-relaxed">
      TanStack 想做的不是“再造一个 UI 框架”，而是把 <span class="font-mono">应用骨架</span>、<span class="font-mono">数据流</span>、<span class="font-mono">复杂控件模型</span> 抽成一套可复用引擎。
    </div>
  </div>
</div>

---
layout: two-cols-header
---

# Start + Router：先把应用骨架搭稳

::left::

<v-clicks>

- **TanStack Start**：把 Router、服务端函数、SSR/streaming 这些入口封在一起。
- **TanStack Router**：强类型路由、参数校验、search state、loader、预加载。
- 如果你已经有 React SPA，通常可以 **先上 Router，再考虑 Start**。
- 如果你要新开一个中后台 / 内容平台，Start 是更顺手的起点。

</v-clicks>

::right::

```txt
URL
 ↓
Router
 ↓  loader / params / search
Query Cache
 ↓
Page / Layout / Components
```

---
layout: two-cols-header
---

# Query：服务端状态不是本地 state

::left::

<div class="grid grid-cols-2 gap-4 mt-8">
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2 signal-good">缓存</div>
    <div class="text-sm opacity-80">query key、stale time、gc time</div>
  </div>
  <div v-click="1" class="tech-card">
    <div class="text-lg font-semibold mb-2 signal-good">请求状态</div>
    <div class="text-sm opacity-80">loading / error / success / fetching</div>
  </div>
  <div v-click="2" class="tech-card">
    <div class="text-lg font-semibold mb-2 signal-good">预取</div>
    <div class="text-sm opacity-80">hover、router loader、进入前预热</div>
  </div>
  <div v-click="2" class="tech-card">
    <div class="text-lg font-semibold mb-2 signal-good">更新策略</div>
    <div class="text-sm opacity-80">invalidate、mutation、optimistic update</div>
  </div>
</div>

::right::

```ts
const usersQuery = useQuery({
  queryKey: ['users', filters],
  queryFn: () => fetchUsers(filters),
  staleTime: 30_000,
})

const updateUser = useMutation({
  mutationFn: patchUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
```

---
layout: two-cols-header
---

# Table：把“表格逻辑”从 UI 组件里拆出去

::left::

<v-clicks>

- TanStack Table 是 **headless datagrid engine**，不负责长相，只负责模型。
- 排序、筛选、分页、分组、列显隐、行选择，都可以独立启用。
- 非常适合接公司自己的 design system，而不是被现成 table UI 绑死。
- 复杂后台越复杂，越能体现值。

</v-clicks>

::right::

```ts
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})
```

---
layout: two-cols-header
---

# Form / Store / Pacer：把交互细节补齐

::left::

<div class="grid grid-cols-1 gap-4 mt-8">
  <div v-click="1" class="glass p-5 rounded-2xl">
    <div class="text-lg font-semibold mb-2">Form</div>
    <div class="text-sm opacity-80">字段状态、校验、提交过程抽离出来，适合长表单和动态表单。</div>
  </div>
  <div v-click="2" class="glass p-5 rounded-2xl">
    <div class="text-lg font-semibold mb-2">Store</div>
    <div class="text-sm opacity-80">轻量本地状态，适合 UI 级共享信息，不要拿它替代 Query。</div>
  </div>
  <div v-click="3" class="glass p-5 rounded-2xl">
    <div class="text-lg font-semibold mb-2">Pacer</div>
    <div class="text-sm opacity-80">给搜索、联想、批量操作这类高频交互兜住节流与批处理节奏。</div>
  </div>
</div>

::right::

<v-clicks>

- **Query 管服务端状态**
- **Store 管本地界面状态**
- **Form 管输入与校验过程**
- **Pacer 管高频触发节奏**

</v-clicks>

---
layout: two-cols-header
---

# Virtual：性能问题要前置解决

::left::

<v-clicks>

- 长列表、超长表格、日志流、聊天记录都不是“分页就完事”。
- TanStack Virtual 让渲染窗口只保留用户此刻看得到的部分。
- 通常和 Table 搭配最有价值，尤其是万级行数的后台页面。
- 如果数据量不大，不要为了技术完整度硬上虚拟化。

</v-clicks>

::right::

```ts
const rowVirtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 42,
  overscan: 8,
})
```

---
layout: center
---

# 一套典型组合：后台搜索页 / 数据运营页

```mermaid
%%{init: {"flowchart": {"nodeSpacing": 22, "rankSpacing": 22}, "themeVariables": {"fontSize": "14px"}} }%%
flowchart LR
  A["Router<br/>search params / loader"] --> B["Query<br/>fetch + cache"]
  B --> C["Table<br/>sort / filter / column model"]
  C --> D["Virtual<br/>only render visible rows"]
  C --> E["Form<br/>batch edit / create modal"]
  E --> F["Mutation"]
  F --> B
```

---
layout: center
---

# 什么时候值得上 TanStack 全家桶？

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-3 signal-good">适合</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li>搜索页、列表页、复杂后台、强交互运营平台</li>
      <li>团队愿意接受 headless 方案，自己掌控 UI</li>
      <li>你很在意类型、安全重构和复杂状态一致性</li>
    </ul>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl">
    <div class="text-lg font-semibold mb-3 signal-hot">不必强上</div>
    <ul class="text-sm opacity-80 leading-relaxed space-y-2">
      <li>营销官网、简单表单页、静态内容页</li>
      <li>团队只想快出页面，不想维护模型层</li>
      <li>页面复杂度太低，用原生 React 就够</li>
    </ul>
  </div>
</div>

<div v-click="2" class="mt-10 text-sm opacity-75">
  关键不是“全上才高级”，而是 <span class="font-mono">哪一层复杂，才在哪一层引入 TanStack</span>。
</div>

---
layout: center
---

# 推荐落地顺序

<div class="flex flex-wrap gap-4 justify-center mt-12">
  <div v-click="1" class="ecosystem-chip">1. 先上 Query</div>
  <div v-click="2" class="ecosystem-chip">2. 列表复杂了上 Table</div>
  <div v-click="3" class="ecosystem-chip">3. 路由状态复杂了上 Router</div>
  <div v-click="4" class="ecosystem-chip">4. 长表单再上 Form</div>
  <div v-click="5" class="ecosystem-chip">5. 性能瓶颈再上 Virtual</div>
  <div v-click="6" class="ecosystem-chip">6. 新项目再考虑 Start</div>
</div>

<div class="glass p-6 rounded-2xl max-w-4xl mx-auto mt-10" v-click="7">
  <div class="text-lg font-semibold mb-2">为什么是这个顺序？</div>
  <div class="text-sm opacity-80 leading-relaxed">
    Query 最通用、回报也最稳定；Table / Router / Form / Virtual 更像针对复杂页面的增量武器。Start 则更适合新项目从零定基线。
  </div>
</div>

---
layout: center
---

# 小结

<v-clicks>

- **TanStack 不只是 Query，而是一套应用层引擎集合**
- **核心价值不是“统一 UI”，而是统一复杂状态与复杂交互的建模方式**
- **最实用的采用策略不是 All in，而是从 Query 开始，按复杂度逐层叠加**
- **真正吃到红利的场景，往往是复杂中后台和数据密集型页面**

</v-clicks>

---
layout: center
---

# Q & A

<div class="text-2xl opacity-80 mt-8">
谢谢大家
</div>
