---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
routerMode: hash
mdc: true
layout: center
glowSeed: 7
title: T3 Fullstack 技术分享
exportFilename: T3-Fullstack-slidev-exported
monaco: true
---

<div class="text-5xl font-bold gradient-text mb-6">
T3 Fullstack 技术分享
</div>

<div class="text-xl opacity-80 mb-10">
“全栈开发新范式：Next.js 引领的高效开发实践”
</div>

<div class="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-0>
    <div class="text-4xl mb-3">🌐</div>
    <div class="font-mono text-sm">Next.js</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-200>
    <div class="text-4xl mb-3">🔥</div>
    <div class="font-mono text-sm">tRPC</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-400>
    <div class="text-4xl mb-3">✅</div>
    <div class="font-mono text-sm">Zod</div>
  </div>
  <div v-click="1" class="tech-card text-center float-animation" transition duration-500 forward:delay-600>
    <div class="text-4xl mb-3">📦</div>
    <div class="font-mono text-sm">Prisma</div>
  </div>
</div>

<div class="abs-br m-6 flex gap-2 opacity-70">
  <div class="text-sm">cycleccc</div>
  <div class="text-sm">•</div>
  <div class="text-sm">二五年四月二七日</div>
</div>

---
layout: center
---

# 今天聊什么

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-1">🧑‍💻 为什么选择 T3</div>
    <div class="text-sm opacity-75">类型安全 + 研发效率</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-1">🌐 Next.js</div>
    <div class="text-sm opacity-75">路由 / API / 渲染模式</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-1">🔥 tRPC + ✅ Zod</div>
    <div class="text-sm opacity-75">端到端类型安全 + 运行时校验</div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-1">📦 Prisma + 🛡️ NextAuth</div>
    <div class="text-sm opacity-75">DB + Auth 基础设施</div>
  </div>
</div>

---
layout: center
---

# 什么是 T3 Stack？

<v-clicks>

- **Next.js**：全栈框架（路由 / SSR / API）
- **tRPC**：端到端类型安全的 API 调用
- **Zod**：运行时输入校验 + 类型推导
- **Prisma**：类型安全 ORM + migrations
- **NextAuth**：认证（OAuth/Email/…）
- UI（可选）：Ant Design Pro / shadcn/ui / 你喜欢的任何方案

</v-clicks>

---
layout: center
---

# 为什么选择 T3？

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">✅ 研发效率</div>
    <div class="text-sm opacity-80 leading-relaxed">
      少写接口文档 / 少写重复类型；前后端像“同一个项目”协作。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">🧷 类型安全</div>
    <div class="text-sm opacity-80 leading-relaxed">
      <span class="font-mono">compile-time</span> + <span class="font-mono">runtime</span> 双保险：错误尽量在本地就爆。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-400>
    <div class="text-lg font-semibold mb-2">⚡ 性能与体验</div>
    <div class="text-sm opacity-80 leading-relaxed">
      SSR/SSG/ISR 按场景选；后端同仓库、同语言，上手快。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-600>
    <div class="text-lg font-semibold mb-2">🛡️ 安全与规范</div>
    <div class="text-sm opacity-80 leading-relaxed">
      NextAuth、Prisma、Zod 都是“社区最佳实践”的默认选项。
    </div>
  </div>
</div>

---
layout: center
---

# Next.js：全栈开发基石

<v-clicks>

- 前端：React + Routing + Data Fetching
- 后端：API Routes / Server Actions（可选）
- 渲染：SSG / SSR / CSR / ISR
- 部署：Vercel / Docker / 自建 Node

</v-clicks>

---
layout: two-cols-header
---

# Next.js 文件路由（App Router）

::left::

```txt
app/
  ├─ layout.tsx          → 全局布局
  ├─ page.tsx            → /
  ├─ (marketing)/
  │   └─ about/page.tsx  → /about
  └─ (dashboard)/
      └─ user/[id]/page.tsx → /user/:id
```

::right::

<v-clicks>

- `layout.tsx`：共享导航/样式/状态
- `page.tsx`：页面入口
- `loading.tsx`：自动加载态
- `error.tsx`：错误边界
- `(group)`：路由分组（不入 URL）
- `[id]`：动态路由参数

</v-clicks>

---
layout: two-cols-header
---

# Next.js API 路由（直觉上像“本地函数”）

::left::

```txt
app/api/
  ├─ hello/route.ts        → /api/hello
  └─ user/[id]/route.ts    → /api/user/:id
```

::right::

```ts
// 传统：跨项目/跨域/跨团队
fetch('https://api.example.com/user/123')

// Next：同仓库，直接相对路径
fetch('/api/user/123')
```

---
layout: center
---

# 渲染模式：SSG / SSR / CSR / ISR

| 模式 | 适用场景 | SEO | 首屏 |
|---|---|---:|---:|
| SSG | 博客/文档/官网 | ✅ | 🚀 |
| SSR | 搜索/强个性化页 | ✅ | 🐢 |
| CSR | 管理后台/强交互 | ❌ | 🐢 |
| ISR | 内容可更新的静态页 | ✅ | 🚀 |

---
layout: two-cols-header
---

# 🧊 SSG：静态生成

::left::

<v-clicks>

- 适合：内容不频繁变化（文档、官网、博客）
- 优点：构建产物就是 HTML，加载快、CDN 友好
- 缺点：更新要重新构建

</v-clicks>

::right::

```txt
浏览器 → CDN/静态文件 → HTML
```

---
layout: two-cols-header
---

# 🔁 SSR：服务端渲染

::left::

<v-clicks>

- 适合：强个性化、实时性更强的页面（搜索/仪表盘）
- 优点：SEO 友好、首屏可控
- 缺点：服务器压力更大；缓存策略更重要

</v-clicks>

::right::

```txt
浏览器 → 服务器渲染 HTML → 返回
```

---
layout: two-cols-header
---

# 🖼️ CSR：客户端渲染

::left::

<v-clicks>

- 适合：内部后台、强交互页面
- 优点：部署简单、交互顺滑
- 缺点：SEO 不友好；首屏依赖 JS

</v-clicks>

::right::

```txt
浏览器 → 空 HTML + JS → JS 渲染页面
```

---
layout: two-cols-header
---

# 🔄 ISR：增量静态生成

::left::

<v-clicks>

- SSG 的升级版：静态性能 + 定时更新
- 适合：内容不实时但需更新（新闻/商品页）
- 关键：`revalidate` / 缓存失效策略

</v-clicks>

::right::

```ts
export async function getStaticProps() {
  return {
    props: { /* ... */ },
    revalidate: 60,
  }
}
```

---
layout: two-cols-header
---

# 怎么选？

::left::

<v-clicks>

- **默认 SSG/ISR**：能静态就静态
- **需要 SEO + 强个性化**：SSR
- **内部系统**：CSR 也 OK（但注意首屏与权限）
- **混合**：同一站点不同页面不同策略

</v-clicks>

::right::

<div class="glass p-6 rounded-2xl">
  <div class="text-sm opacity-80 leading-relaxed">
    最常见的错误不是“没选对”，而是：<br/>
    1) 过早过度 SSR；2) 全站 CSR 导致首屏慢；3) 没把缓存策略想清楚。
  </div>
</div>

---
layout: center
---

# tRPC：类型安全通信（少写文档，多写类型）

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-3">前端程序员の日常</div>
    <pre class="text-xs opacity-80"><code>const res = await fetch('/api/user/114514')
const data = await res.json()
console.log(data.avater) // 哦豁，拼错了 avatar</code></pre>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-3">当你用 tRPC</div>
    <pre class="text-xs opacity-80"><code>const { data } = trpc.user.getById.useQuery(114514)
// 后端敢返回没有 avatar：TS 先炸给你看</code></pre>
  </div>
</div>

---
layout: two-cols-header
---

# tRPC 使用：Router + Procedure

::left::

```ts
const appRouter = router({
  getCoffee: procedure
    .input(z.object({
      mode: z.enum(['深度工作', '协作会议']),
      focusMode: z.boolean(),
    }))
    .query(({ input }) => input.focusMode
      ? '高效编码中...'
      : db.coffee.findRandom()),
})
```

::right::

```ts
function ProductivityButton() {
  const { data } = trpc.getCoffee.useQuery({
    mode: '深度工作',
    focusMode: useStore(s => s.isFocusMode),
  })
  return <Button>{data || '正在获取咖啡灵感...'}</Button>
}
```

---
layout: center
---

# tRPC 预览（示意）

<div class="glass p-6 rounded-2xl max-w-5xl mx-auto">
  <img src="/trpc.gif" class="w-full rounded-xl border border-white/10" />
</div>

---
layout: two-cols-header
---

# tRPC 原理（你只需要记住 3 件事）

::left::

<v-clicks>

- **Router**：组织 API（像目录树）
- **Procedure**：query/mutation + middlewares
- **类型推导**：`type AppRouter = typeof appRouter`

</v-clicks>

::right::

```ts
const appRouter = router({
  user: router({
    getById: procedure
      .input(z.number())
      .query(({ input }) => db.user.findUnique({ where: { id: input } })),
  }),
})

type AppRouter = typeof appRouter
```

---
layout: center
---

# Zod：运行时类型验证利器

<v-clicks>

- TS 只在编译时；**请求/表单/环境变量** 都是 runtime
- Zod 把“校验 + 类型”写在一起：`parse` / `safeParse`
- 和 tRPC 配合：输入校验 + 返回值推导 = 端到端类型安全

</v-clicks>

---
layout: two-cols-header
---

# 为什么需要 Zod？

::left::

```ts
type UserInput = { age: number; email: string }

function processUser(input: UserInput) {
  return input.age * 2
}

// input 可能来自网络：运行时不可信
```

::right::

```ts
const UserSchema = z.object({
  age: z.number().min(0).max(120),
  email: z.string().email(),
})

function processUser(input: unknown) {
  const user = UserSchema.parse(input)
  return user.age * 2
}
```

---
layout: two-cols-header
---

# Zod + tRPC：把“接口契约”写进代码

::left::

```ts
export const appRouter = router({
  createUser: procedure
    .input(z.object({
      name: z.string().min(2),
      age: z.number().min(0),
      email: z.string().email(),
      role: z.enum(['user', 'admin']),
    }))
    .mutation(({ input }) => prisma.user.create({ data: input })),
})
```

::right::

```ts
function RegisterForm() {
  const mutation = trpc.createUser.useMutation()
  return <button onClick={() => mutation.mutate({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
    role: 'user',
  })}>Register</button>
}
```

---
layout: center
---

# Zod 常用模式（记住这些就够用了）

```ts
z.string().min(3).max(20)
z.number().int().min(0).max(120)
z.string().email()
z.array(z.string()).min(1)
z.object({ ... }).extend({ ... })
z.union([A, B])
```

---
layout: two-cols-header
---

# Zod 最佳实践：错误信息 + 复用

::left::

```ts
const baseUser = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})

const newUser = baseUser.extend({
  password: z.string().min(6, '密码至少 6 位'),
})
```

::right::

```ts
const schema = z.string({
  required_error: '此字段不能为空',
  invalid_type_error: '必须是字符串',
})
```

---
layout: two-cols-header
---

# Zod + React Hook Form（表单校验）

::left::

```ts
const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})
```

::right::

```ts
const form = useForm({
  resolver: zodResolver(schema),
})
```

---
layout: center
---

# Prisma：类型安全 ORM

<v-clicks>

- Schema 统一管理：`schema.prisma`
- 迁移：`prisma migrate`
- 查询：`prisma.user.findMany(...)` 有类型提示

</v-clicks>

---
layout: two-cols-header
---

# Prisma：Schema + CRUD（简化版）

::left::

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  posts Post[]
}

model Post {
  id       Int   @id
  title    String
  author   User  @relation(fields: [authorId], references: [id])
  authorId Int
}
```

::right::

```ts
await prisma.user.create({
  data: {
    email: 'zhang@example.com',
    name: '张三',
    posts: { create: { title: '第一篇博客' } },
  },
})

await prisma.post.findMany({
  include: { author: true },
})
```

---
layout: center
---

# Prisma 还能带来什么

<v-clicks>

- 迁移：`prisma migrate dev` / `deploy`
- 生成客户端：`prisma generate`（CI 里跑）
- 关系查询更直观：`include` / `select`
- 结合 Zod：把“输入校验”和“DB 约束”都写清楚

</v-clicks>

---
layout: center
---

# Prisma vs Drizzle（怎么选）

| 维度 | Prisma | Drizzle |
|---|---|---|
| 体验 | ORM 一把梭 | SQL 优先、轻量 |
| 性能 | 🐢（更重） | 🚀（更轻） |
| 迁移 | 完整工具链 | 你需要更懂 SQL |
| 适用 | 中大型常见业务 | 性能敏感/经验丰富 |

---
layout: center
---

# NextAuth：身份认证的最佳实践

<div class="grid grid-cols-2 gap-6 max-w-6xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">开箱即用</div>
    <div class="text-sm opacity-80 leading-relaxed">
      OAuth / Email / Credentials；内置 CSRF、回调、session 管理。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">和 Prisma 集成</div>
    <div class="text-sm opacity-80 leading-relaxed">
      Adapter 把账号/会话落库；权限与业务表自然关联。
    </div>
  </div>
</div>

---
layout: two-cols-header
---

# NextAuth：最简配置 + Providers

::left::

```ts
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
}

export default NextAuth(authOptions)
```

::right::

<div class="glass p-4 rounded-2xl">
  <img src="/auth-providers.png" class="w-full rounded-xl border border-white/10" />
</div>

---
layout: two-cols-header
---

# NextAuth + Prisma Adapter（示意）

::left::

```ts
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [/* ... */],
}
```

::right::

<v-clicks>

- 账号/会话落库，方便审计与权限扩展
- 业务表可以直接关联 `userId`
- 适合“需要企业级用户体系”的场景

</v-clicks>

---
layout: two-cols-header
---

# NextAuth：客户端 / 服务端怎么用

::left::

```ts
'use client'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()
  if (!session) return <div>请先登录</div>
  return <div>欢迎回来，{session.user?.name}</div>
}
```

::right::

```ts
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession()
  if (!session) return { redirect: { destination: '/login' } }
  return <AdminDashboard user={session.user} />
}
```

---
layout: center
---

# Ant Design Pro：企业级中后台（可选）

<v-clicks>

- 优点：模板齐全、业务组件丰富、适合“快速上线”
- 典型组件：`ProLayout` / `ProTable` / `ProForm`
- 预览：`https://preview.pro.ant.design/`

</v-clicks>

---
layout: two-cols-header
---

# Ant Design Pro 常用布局与组件

::left::

<v-clicks>

- `ProLayout`：菜单/面包屑/响应式布局
- `ProTable`：表格（分页/查询/工具栏）
- `ProForm`：表单（联动/校验/布局）

</v-clicks>

::right::

<v-clicks>

- 业务组件：`ProCard` / `ProDescriptions` / `ProList`
- 最佳实践：按需加载、统一主题、权限路由

</v-clicks>

---
layout: two-cols-header
---

# ProTable + tRPC（示意）

::left::

```tsx
<ProTable<API.UserInfo>
  columns={columns}
  request={async (params) => {
    const { data } = await trpc.user.list.query({
      current: params.current,
      pageSize: params.pageSize,
      ...params,
    })
    return { data: data.list, total: data.total }
  }}
  rowKey="id"
/>
```

::right::

<div class="glass p-6 rounded-2xl">
  <div class="text-sm opacity-80 leading-relaxed">
    核心思路：把 ProTable 的 <span class="font-mono">request</span> 变成 tRPC 调用，类型直接沿用后端返回。
  </div>
</div>

---
layout: center
---

# shadcn/ui：现代化组件方案（可选）

<v-clicks>

- 不是“组件库”，是“组件源码集合”
- 复制到项目里，完全可控、易定制
- 基于 Radix UI + Tailwind CSS

</v-clicks>

---
layout: two-cols-header
---

# shadcn/ui：安装与使用（示意）

::left::

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
```

::right::

```tsx
import { Button } from '@/components/ui/button'

export function Save() {
  return <Button>保存</Button>
}
```

---
layout: two-cols-header
---

# shadcn/ui：主题定制（示意）

::left::

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
  }
}
```

::right::

<div class="glass p-6 rounded-2xl">
  <div class="text-sm opacity-80 leading-relaxed">
    “把设计系统变量化”，迁移/换肤/暗黑模式会顺很多。
  </div>
</div>

---
layout: two-cols-header
---

# shadcn/ui + 表单验证（示意）

::left::

```ts
const form = useForm({
  resolver: zodResolver(loginSchema),
})
```

::right::

```tsx
<Form {...form}>
  <FormField name="email" render={({ field }) => (
    <FormItem>
      <FormLabel>邮箱</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
    </FormItem>
  )} />
</Form>
```

---
layout: center
---

# 收尾：把它当成“默认工程化配置”

<div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-0>
    <div class="text-lg font-semibold mb-2">✅ 默认推荐</div>
    <div class="text-sm opacity-80 leading-relaxed">
      Next.js + tRPC + Zod + Prisma + NextAuth：足够覆盖 80% 业务。
    </div>
  </div>
  <div v-click="1" class="glass p-6 rounded-2xl" transition duration-500 forward:delay-200>
    <div class="text-lg font-semibold mb-2">🎯 关键原则</div>
    <div class="text-sm opacity-80 leading-relaxed">
      类型是协作语言；校验是边界；路由/渲染按场景；工具链要可持续。
    </div>
  </div>
</div>

---
layout: center
---

# Q&A

<div class="opacity-70 mt-10">
仓库：<span class="font-mono">cycleccc/notes</span>
</div>
