---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
layout: center
glowSeed: 4
title: 企业级全栈技术栈分享
exportFilename: 企业级全栈技术栈分享-slidev-exported
monaco: true
---

<div class="text-5xl font-bold gradient-text mb-8">
企业级全栈技术栈分享
</div>

<div class="text-xl opacity-80 mb-12">
从 T3 Stack 到企业级解决方案的演进
</div>

<div class="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
  <div v-click class="tech-card text-center float-animation">
    <div class="text-4xl mb-3">🏗️</div>
    <div class="font-mono text-sm">Turbo</div>
  </div>
  <div v-click class="tech-card text-center float-animation" style="animation-delay: 0.2s">
    <div class="text-4xl mb-3">⚡</div>
    <div class="font-mono text-sm">Web/API 选型</div>
  </div>
  <div v-click class="tech-card text-center float-animation" style="animation-delay: 0.4s">
    <div class="text-4xl mb-3">🔗</div>
    <div class="font-mono text-sm">ts-rest</div>
  </div>
  <div v-click class="tech-card text-center float-animation" style="animation-delay: 0.6s">
    <div class="text-4xl mb-3">🛠️</div>
    <div class="font-mono text-sm">Biome</div>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 opacity-60">
  <div class="text-sm">cycleccc</div>
  <div class="text-sm">•</div>
  <div class="text-sm">2025</div>
</div>

---
layout: center
---

# 今天我们聊什么？

<div class="grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-3xl mb-4">🤔</div>
    <div class="text-lg font-semibold mb-2">为什么要升级？</div>
    <div class="text-sm opacity-70">从个人项目到企业级的挑战</div>
  </div>
  
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-3xl mb-4">🚀</div>
    <div class="text-lg font-semibold mb-2">新技术栈</div>
    <div class="text-sm opacity-70">Turbo + ts-rest + tRPC + (Next 或 Vite/Hono)</div>
  </div>
  
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-3xl mb-4">📊</div>
    <div class="text-lg font-semibold mb-2">真实案例</div>
    <div class="text-sm opacity-70">wangEditor-next / knitting-tutorial / ai-studio</div>
  </div>
  
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-3xl mb-4">⚡</div>
    <div class="text-lg font-semibold mb-2">性能提升</div>
    <div class="text-sm opacity-70">65%+ 构建时间减少</div>
  </div>
</div>

---
layout: center
---

# 为什么要升级技术栈？

<div class="grid grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
  <div v-click class="text-center">
    <div class="text-6xl mb-6">📈</div>
    <div class="text-xl font-semibold mb-4 gradient-text">规模增长</div>
    <div class="text-sm opacity-70 leading-relaxed">
      从个人项目到多团队协作<br/>
      代码库管理复杂度激增<br/>
      构建部署流程需要优化
    </div>
  </div>
  
  <div v-click class="text-center">
    <div class="text-6xl mb-6">🛡️</div>
    <div class="text-xl font-semibold mb-4 gradient-text">质量要求</div>
    <div class="text-sm opacity-70 leading-relaxed">
      类型安全性要求提高<br/>
      代码质量标准化<br/>
      减少生产环境 bug
    </div>
  </div>
  
  <div v-click class="text-center">
    <div class="text-6xl mb-6">⚡</div>
    <div class="text-xl font-semibold mb-4 gradient-text">性能需求</div>
    <div class="text-sm opacity-70 leading-relaxed">
      微服务架构支持<br/>
      更强的可扩展性<br/>
      更好的开发者体验
    </div>
  </div>
</div>

<div v-click class="text-center mt-16">
  <div class="text-lg opacity-80">
    T3 Stack 很好，但我们需要<span class="gradient-text font-semibold">更强大的解决方案</span>
  </div>
</div>

---
layout: center
---

# 我们的技术栈

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto mt-10 auto-rows-fr">
  <div v-click class="glass h-full p-6 rounded-3xl glow-animation flex flex-col gap-4">
    <div class="text-4xl text-center">🏗️</div>
    <div class="text-xl font-bold text-center gradient-text">Turbo Monorepo</div>
<div class="text-center opacity-80 text-sm leading-relaxed">
      高性能构建系统<br/>
      <code class="text-xs">65%+ 构建时间减少</code>
    </div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-3xl flex flex-col gap-4">
    <div class="text-4xl text-center">🔗</div>
    <div class="text-xl font-bold text-center gradient-text">契约优先 API</div>
    <div class="text-center opacity-80 text-sm leading-relaxed">
      ts-rest / tRPC + Zod<br/>
      端到端类型 + 运行时校验
    </div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-3xl flex flex-col gap-4">
    <div class="text-4xl text-center">🛠️</div>
    <div class="text-xl font-bold text-center gradient-text">开发体验</div>
    <div class="text-center opacity-80 text-sm leading-relaxed">
      Biome 格式化 / Lint<br/>
      Turbo + pnpm 跨包联调
    </div>
  </div>
</div>

---
layout: center
---

# Turbo Monorepo

<div class="flex flex-col items-center gap-8 max-w-5xl w-full mx-auto mt-2">
<div class="text-lg opacity-80 text-center leading-relaxed">
  高性能的 Monorepo 构建系统
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full auto-rows-fr">
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-4xl">🚀</div>
    <div class="text-base font-semibold gradient-text">极速构建</div>
    <div class="text-sm opacity-70 leading-relaxed">
      智能任务调度<br/>
      分布式缓存<br/>
      增量构建
    </div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-4xl">📦</div>
    <div class="text-base font-semibold gradient-text">包管理</div>
    <div class="text-sm opacity-70 leading-relaxed">
      共享依赖<br/>
      版本统一管理<br/>
      跨包类型共享
    </div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-4xl">🔄</div>
    <div class="text-base font-semibold gradient-text">任务编排</div>
    <div class="text-sm opacity-70 leading-relaxed">
      依赖图构建<br/>
      并行执行<br/>
      失败快速反馈
    </div>
  </div>
</div>
</div>

---
layout: center
---

# Turbo 配置示例

<div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
  <div class="glass p-6 rounded-2xl text-sm">
    <div class="text-base font-semibold gradient-text mb-3">常用任务</div>
    <div class="font-mono text-xs leading-relaxed">
      <div>build → dependsOn ^build，outputs dist/.next</div>
      <div>test → dependsOn build，inputs src/**/*.ts(x)</div>
      <div>dev → cache false，persistent true</div>
      <div>lint/format → outputs []，方便缓存命中</div>
    </div>
    <div class="text-xs opacity-70 mt-3">声明 inputs/outputs + 依赖链，让 Turbo 只跑受影响的包。</div>
  </div>
  
  <div class="glass p-6 rounded-2xl text-center space-y-3">
    <div class="text-base font-semibold gradient-text">一条命令</div>
    <code class="text-xs bg-gray-900/60 px-3 py-2 rounded-lg block">turbo run build --filter=...@main</code>
    <div class="text-xs opacity-70">只构建变更的包，其他命中缓存直接跳过。</div>
    <div class="text-xs opacity-70">增量构建配合远程缓存，CI/CD 同样受益。</div>
  </div>
</div>

---
layout: center
---

# T3 → Turbo 升级路径

<v-clicks>

1. 单体 T3（Next.js + tRPC）：快速 MVP，验证业务
2. 引入 Turbo + packages：抽离 contracts/ui/utils，共享类型与工具
3. 多端/多服务扩展：Hono/tRPC 或 ts-rest，Taro/React Native 并行
4. 规范固化：Biome/Lint + Turbo pipeline gate build/test，拉齐团队习惯

</v-clicks>

<div class="text-xs opacity-70 mt-6 text-center">
knitting-tutorial 覆盖 Step 3；ai-studio 证明轻量项目也能低成本接入。
</div>

---
layout: center
---

# 真实案例：wangEditor-next

<div class="text-lg opacity-80 mb-12">基于 Slate.js 的富文本编辑器项目</div>

<div class="text-sm opacity-70 mb-4">
  开源地址：
  <a href="https://github.com/wangeditor-next/wangEditor-next" class="underline" target="_blank">github.com/wangeditor-next/wangEditor-next</a>
</div>

<div class="grid grid-cols-2 gap-16 max-w-5xl mx-auto">
  <div>
    <div class="text-2xl font-semibold mb-8 gradient-text">挑战</div>
    <div class="space-y-4">
      <div v-click class="flex items-center gap-4">
        <div class="text-2xl">🏗️</div>
        <div>
          <div class="font-semibold">多包架构复杂</div>
          <div class="text-sm opacity-70">Vue2/Vue3/React 适配器</div>
        </div>
      </div>
      <div v-click class="flex items-center gap-4">
        <div class="text-2xl">⚡</div>
        <div>
          <div class="font-semibold">构建效率低下</div>
          <div class="text-sm opacity-70">全量构建 5分12秒</div>
        </div>
      </div>
      <div v-click class="flex items-center gap-4">
        <div class="text-2xl">💰</div>
        <div>
          <div class="font-semibold">维护成本高</div>
          <div class="text-sm opacity-70">版本同步困难</div>
        </div>
      </div>
    </div>
  </div>
  
  <div>
    <div class="text-2xl font-semibold mb-8 gradient-text">解决方案</div>
    <div class="space-y-4">
      <div v-click class="flex items-center gap-4">
        <div class="text-2xl">✅</div>
        <div>
          <div class="font-semibold">Turbo Monorepo</div>
          <div class="text-sm opacity-70">构建时间减少 65.4%</div>
        </div>
      </div>
      <div v-click class="flex items-center gap-4">
        <div class="text-2xl">✅</div>
        <div>
          <div class="font-semibold">智能缓存</div>
          <div class="text-sm opacity-70">增量构建 81.3% 提升</div>
        </div>
      </div>
      <div v-click class="flex items-center gap-4">
        <div class="text-2xl">✅</div>
        <div>
          <div class="font-semibold">统一工具链</div>
          <div class="text-sm opacity-70">开发体验大幅提升</div>
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
---

# 性能提升数据

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto mt-8 auto-rows-fr items-stretch">
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-5xl gradient-text font-bold leading-tight">65.4%</div>
    <div class="text-base font-semibold">构建时间减少</div>
    <div class="text-sm opacity-70">5分12秒 → 1分48秒</div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-5xl gradient-text font-bold leading-tight">81.3%</div>
    <div class="text-base font-semibold">增量构建提升</div>
    <div class="text-sm opacity-70">3分45秒 → 42秒</div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-5xl gradient-text font-bold leading-tight">68%</div>
    <div class="text-base font-semibold">启动时间减少</div>
    <div class="text-sm opacity-70">开发体验大幅提升</div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-2xl text-center flex flex-col gap-3 justify-center">
    <div class="text-5xl gradient-text font-bold leading-tight">90%+</div>
    <div class="text-base font-semibold">编译时错误发现</div>
    <div class="text-sm opacity-70">类型安全保障</div>
  </div>
</div>

<div v-click class="text-center mt-10">
  <div class="text-sm opacity-80">
    数据来源：<code class="text-xs">wangEditor-next</code> 项目实际测试
  </div>
</div>

<v-click>

<div class="project-structure">

```
wangEditor-next/
├── packages/
│   ├── editor/              # 核心编辑器
│   ├── editor-for-vue/      # Vue 适配器
│   ├── editor-for-vue2/     # Vue2 适配器
│   ├── editor-for-react/    # React 适配器
│   └── plugins/             # 插件包
├── turbo.json               # Turbo 配置
└── pnpm-workspace.yaml      # 工作区配置
```

</div>

</v-click>

<style>
.project-structure {
  @apply p-4 rounded-lg bg-gray-900 text-green-400 text-sm;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(34, 197, 94, 0.3);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.1);
  font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
}

.project-structure pre {
  @apply m-0;
  color: #22c55e;
}
</style>


---
layout: center
class: text-center
---

# Turbo 实战案例矩阵

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
  <div class="glass p-6 rounded-2xl space-y-3">
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold gradient-text">wangEditor-next</div>
      <div class="text-xs opacity-70">700+ ⭐</div>
    </div>
    <div class="text-sm opacity-80">富文本编辑器，Vue2/3 + React 多适配</div>
    <div class="text-xs opacity-70 leading-relaxed">
      场景：多包发布 + 插件体系<br/>
      Turbo：pnpm build/dev 统一调度，分布式缓存<br/>
      收益：全量 5m12s → 1m48s，增量 42s
    </div>
  </div>
  
  <div class="glass p-6 rounded-2xl space-y-3">
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold gradient-text">knitting-tutorial</div>
      <div class="text-xs opacity-70">多端</div>
    </div>
    <div class="text-sm opacity-80">小程序 + Web + API 的编织教程平台</div>
    <div class="text-xs opacity-70 leading-relaxed">
      场景：Bun(Hono+tRPC) + Vite + Taro3 三端<br/>
      Turbo：一键 <code class="text-[10px]">pnpm dev</code> 串联多进程，共享 packages/types/ui<br/>
      收益：单次安装/缓存复用，多端联调效率显著提升
    </div>
  </div>
  
  <div class="glass p-6 rounded-2xl space-y-3">
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold gradient-text">ai-studio</div>
      <div class="text-xs opacity-70">内推</div>
    </div>
    <div class="text-sm opacity-80">公司内 AI Studio 项目</div>
    <div class="text-xs opacity-70 leading-relaxed">
      场景：轻量多包，敏捷试验<br/>
      Turbo：<code class="text-[10px]">ai-studio/turbo.json</code> 精简 build/test/lint/format pipeline，依赖 .env<br/>
      收益：低成本接入，保留缓存与增量构建价值
    </div>
  </div>
</div>

layout: two-cols
layoutClass: gap-12
---

# wangEditor-next 迁移前后

## 迁移前（传统）

<div class="space-y-3 text-sm opacity-80">
  <div>• 多包手写 Rollup，缺少统一缓存</div>
  <div>• Vue2/Vue3/React 适配器与插件重复打包</div>
  <div>• 全量构建 5m12s，调试需单包反复编译</div>
  <div>• Lint/格式化分散，协作成本高</div>
</div>

::right::

## 迁移后（Turbo）

<div class="space-y-3 text-sm opacity-80">
  <div>• pnpm + Turbo 统一 orchestrate <code class="text-[10px]">packages/*</code> + <code class="text-[10px]">shared/rollup-config</code></div>
  <div>• <code class="text-[10px]">^build</code> 依赖链仅重建受影响包，缓存复用 dist</div>
  <div>• <code class="text-[10px]">pnpm dev</code> watch 跨适配器，增量构建 42s</div>
  <div>• 统一 lint/format/test 流水线，发布节奏更可控</div>
</div>

---
layout: center
---

# 跨端多应用：knitting-tutorial

<div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-8 items-center">
  <div class="project-structure">

```
knitting-tutorial/
├── apps/
│   ├── api/           # Hono + tRPC (Bun)
│   ├── web/           # Vite + React + TanStack Router
│   └── miniprogram/   # Taro3 + React 小程序
├── packages/          # shared-types/ui/utils/trpc-config
├── scripts/
└── turbo.json         # Turbo 串联 dev/build/lint
```

  </div>
  
  <div class="space-y-4 text-sm opacity-80">
    <div class="text-base font-semibold gradient-text">Turbo 的作用</div>
    <div>• 一条 <code class="text-[10px]">pnpm dev</code> 并行拉起 API（Bun）、Web、Mini Program</div>
    <div>• packages 提供 contracts/UI/utilities，多端复用类型</div>
    <div>• 缓存与增量构建减轻多端协作的安装/编译成本</div>
    <div>• Biome + Turbo 统一格式化/检查，降低跨端规范差异</div>
  </div>
</div>

layout: center
---

# 技术取舍（不用 Next/Nest 的场景）

<div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
  <div class="glass p-5 rounded-2xl space-y-2 text-sm opacity-80">
    <div class="text-base font-semibold gradient-text">ai-studio</div>
    <div>沿用开源 Vercel Chatbot 模板（Next.js），但内置 Redis 封装强绑定 Vercel，改造成本高。</div>
    <div>取舍：后续更偏向可控的 Vite/React + Hono/ts-rest 方案，或替换 Redis 客户端以去掉锁定。</div>
  </div>
  <div class="glass p-5 rounded-2xl space-y-2 text-sm opacity-80">
    <div class="text-base font-semibold gradient-text">knitting-tutorial</div>
    <div>全程避免 Next/Nest，采用 Hono + tRPC（Bun），前端 Vite + TanStack Router，配合 Taro3 小程序。</div>
    <div>理由：tRPC 端到端类型是刚需，轻量框架改造/部署成本低，多端一致性更好。</div>
  </div>
  <div class="glass p-5 rounded-2xl space-y-2 text-sm opacity-80">
<div class="text-base font-semibold gradient-text">tRPC 优先</div>
    <div>Nest.js 对 tRPC 支持有限，需要额外适配层；若业务以契约驱动为主，Hono/Express + tRPC 更直接。</div>
    <div>结论：Next/Nest 仍可用在特定场景（SSR、复杂模块化），但 tRPC-first 项目更适合轻量组合。</div>
  </div>
</div>

---
layout: center
---

# 关键数字（实测&落地）

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
  <div class="glass p-6 rounded-2xl">
    <div class="text-4xl font-bold gradient-text mb-2">65.4%</div>
    <div class="text-sm opacity-80">wangEditor-next 全量构建提速</div>
    <div class="text-xs opacity-70">5m12s → 1m48s，增量 42s</div>
  </div>
  <div class="glass p-6 rounded-2xl">
    <div class="text-4xl font-bold gradient-text mb-2">3</div>
    <div class="text-sm opacity-80">端并行开发（knitting-tutorial）</div>
    <div class="text-xs opacity-70">API + Web + 小程序一键 <code>pnpm dev</code></div>
  </div>
  <div class="glass p-6 rounded-2xl">
    <div class="text-4xl font-bold gradient-text mb-2">1 份</div>
    <div class="text-sm opacity-80">轻量配置即可接入（ai-studio）</div>
    <div class="text-xs opacity-70">精简 turbo.json，保留缓存与任务依赖</div>
  </div>
</div>

---
layout: center
class: text-center
---

# 迁移策略（4 步走）

<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
  <div class="bg-blue-500/10 p-4 rounded-lg text-sm">
    <h4 class="font-bold mb-2">1. 提升基础</h4>
    <p>引入 Biome/Lint，脚本统一到 Turbo + pnpm</p>
  </div>
  <div class="bg-green-500/10 p-4 rounded-lg text-sm">
    <h4 class="font-bold mb-2">2. 落地 Monorepo</h4>
    <p>抽离 contracts/ui/utils 包，声明 turbo inputs/outputs</p>
  </div>
  <div class="bg-purple-500/10 p-4 rounded-lg text-sm">
    <h4 class="font-bold mb-2">3. 契约优先</h4>
    <p>tRPC/ts-rest 定义 API 契约，前后端并行</p>
  </div>
  <div class="bg-orange-500/10 p-4 rounded-lg text-sm">
    <h4 class="font-bold mb-2">4. 性能与发布</h4>
    <p>开启远程缓存/CI，并行构建，规范 release 流程</p>
  </div>
</div>

---
layout: center
---

# 收尾 & 下一步

<div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
  <div class="glass p-6 rounded-2xl space-y-3">
    <div class="text-xl font-semibold gradient-text">核心收获</div>
    <div class="text-sm space-y-1">
      <div>• Turbo 缓存 + 依赖图：全量 65%↓，增量 80%+↓</div>
      <div>• 契约优先（tRPC/ts-rest）：前后端并行，类型一致</div>
      <div>• 三端协作（knitting）：一条命令拉起 API/Web/小程序</div>
      <div>• 规范固化：Biome + Turbo pipeline gate</div>
    </div>
  </div>
  
  <div class="glass p-6 rounded-2xl space-y-3">
    <div class="text-xl font-semibold gradient-text">可行动项</div>
    <div class="text-sm space-y-1">
      <div>1) 现有项目接入远程缓存，观测构建/CI 提升</div>
      <div>2) 新项目默认模板：Turbo + 契约层（tRPC/ts-rest）+ Biome</div>
      <div>3) 针对 ai-studio，评估替换 Next 模板的 Redis 封装或迁移 Vite/Hono</div>
      <div>4) 治理：统一 pnpm script 命名、lint/format/type-check 入口</div>
    </div>
  </div>
</div>

---
layout: center
---

<div class="text-center">
  <div class="text-6xl mb-8 gradient-text font-bold">
    谢谢大家！
  </div>
  
  <div v-click class="text-2xl opacity-80 mb-12">
    Questions & Discussion 🤔
  </div>
  
  <div v-click class="flex items-center justify-center gap-8 text-sm opacity-60">
    <div class="flex items-center gap-2">
      <div>GitHub:</div>
      <a href="https://github.com/cycleccc" class="underline" target="_blank">github.com/cycleccc</a>
    </div>
    <div>•</div>
    <div class="flex items-center gap-2">
      <div>wangEditor-next:</div>
      <a href="https://github.com/wangeditor-next/wangEditor-next" class="underline" target="_blank">github.com/wangeditor-next/wangEditor-next</a>
    </div>
    <div>•</div>
    <div class="flex items-center gap-2">
      <div>PPT:</div>
      <a href="https://github.com/cycleccc/notes" class="underline" target="_blank">github.com/cycleccc/notes</a>
    </div>
  </div>
</div>
