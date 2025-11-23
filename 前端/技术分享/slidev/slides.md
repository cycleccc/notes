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
    <div class="font-mono text-sm">Next + Nest</div>
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
    <div class="text-sm opacity-70">Turbo + Next + Nest + ts-rest</div>
  </div>
  
  <div v-click class="glass p-6 rounded-2xl">
    <div class="text-3xl mb-4">📊</div>
    <div class="text-lg font-semibold mb-2">真实案例</div>
    <div class="text-sm opacity-70">wangEditor-next 项目实践</div>
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
    <div class="text-4xl text-center">⚡</div>
    <div class="text-xl font-bold text-center gradient-text">Next.js + Nest.js</div>
    <div class="text-center opacity-80 text-sm leading-relaxed">
      全栈 TypeScript<br/>
      <code class="text-xs">统一的开发体验</code>
    </div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-3xl flex flex-col gap-4">
    <div class="text-4xl text-center">🔗</div>
    <div class="text-xl font-bold text-center gradient-text">ts-rest + Zod</div>
    <div class="text-center opacity-80 text-sm leading-relaxed">
      端到端类型安全<br/>
      <code class="text-xs">90%+ 编译时错误发现</code>
    </div>
  </div>
  
  <div v-click class="glass h-full p-6 rounded-3xl flex flex-col gap-4">
    <div class="text-4xl text-center">🛠️</div>
    <div class="text-xl font-bold text-center gradient-text">Biome</div>
    <div class="text-center opacity-80 text-sm leading-relaxed">
      现代化工具链<br/>
      <code class="text-xs">50ms 格式化速度</code>
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

<div class="max-w-2xl mx-auto">

```json {all|3-6|7-10|11-16|all}
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

</div>

<div v-click class="mt-12 text-center">

```bash
turbo run build --filter=...@main
```

<div class="text-sm opacity-70 mt-2">只构建变更的包，智能缓存其余部分</div>

</div>

---
layout: center
---

# 真实案例：wangEditor-next

<div class="text-lg opacity-80 mb-12">基于 Slate.js 的富文本编辑器项目</div>

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
layout: two-cols
layoutClass: gap-16
---

# Next.js
全栈 React 框架

<v-clicks>

## 企业级特性

- **🎯 App Router**
  - 文件系统路由
  - 服务器组件
  - 流式渲染

- **⚡ 性能优化**
  - 自动代码分割
  - 图片优化
  - 字体优化

- **🔧 开发体验**
  - 热重载
  - TypeScript 支持
  - 内置 API 路由

</v-clicks>

::right::

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

<v-click>

```typescript
// app/api/users/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await getUsersFromDB()
  return Response.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const user = await createUser(body)
  return Response.json(user)
}
```

</v-click>

---
layout: two-cols
layoutClass: gap-16
---

# Nest.js
企业级 Node.js 框架

<v-clicks>

## 架构优势

- **🏗️ 模块化设计**
  - 依赖注入
  - 装饰器模式
  - 可测试性

- **🔌 丰富生态**
  - WebSocket 支持
  - 微服务架构
  - GraphQL 集成

- **🛡️ 企业特性**
  - 守卫和拦截器
  - 管道验证
  - 异常过滤器

</v-clicks>

::right::

```typescript
// user.controller.ts
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() query: FindUsersDto) {
    return this.userService.findAll(query)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
```

<v-click>

```typescript
// user.service.ts
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(query: FindUsersDto): Promise<User[]> {
    return this.userRepository.find({
      where: query,
      relations: ['profile']
    })
  }
}
```

</v-click>

---
layout: two-cols
layoutClass: gap-16
---

# ts-rest
端到端类型安全的 API

<v-clicks>

## 核心特性

- **🔗 契约优先**
  - 统一 API 定义
  - 自动类型生成
  - 运行时验证

- **🎯 开发体验**
  - 智能提示
  - 编译时检查
  - 自动补全

- **🚀 性能优势**
  - 零运行时开销
  - 树摇优化
  - 类型推导

</v-clicks>

::right::

```typescript
// contracts/user.contract.ts
import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const c = initContract()

export const userContract = c.router({
  getUser: {
    method: 'GET',
    path: '/users/:id',
    responses: {
      200: UserSchema,
      404: z.object({ message: z.string() })
    }
  },
  createUser: {
    method: 'POST',
    path: '/users',
    body: CreateUserSchema,
    responses: {
      201: UserSchema
    }
  }
})
```

<v-click>

```typescript
// 客户端使用
const client = initClient(userContract, {
  baseUrl: 'http://localhost:3000',
})

// 完全类型安全的调用
const { status, body } = await client.getUser({
  params: { id: '123' }
})

if (status === 200) {
  console.log(body.name) // 类型安全！
}
```

</v-click>

---
layout: two-cols
layoutClass: gap-16
---

# Zod
运行时类型验证

<v-clicks>

## 强大功能

- **✅ 数据验证**
  - 运行时类型检查
  - 自定义验证规则
  - 错误信息定制

- **🔄 类型推导**
  - TypeScript 集成
  - 自动类型生成
  - 零重复定义

- **🛠️ 生态集成**
  - React Hook Form
  - tRPC 兼容
  - OpenAPI 生成

</v-clicks>

::right::

```typescript
// schemas/user.schema.ts
import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string()
    .min(2, '姓名至少2个字符')
    .max(50, '姓名不能超过50个字符'),
  email: z.string()
    .email('请输入有效的邮箱地址'),
  age: z.number()
    .int('年龄必须是整数')
    .min(0, '年龄不能为负数')
    .max(120, '年龄不能超过120'),
  role: z.enum(['user', 'admin', 'moderator'])
    .default('user')
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
```

<v-click>

```typescript
// 在 Nest.js 中使用
@Post()
async createUser(@Body() body: unknown) {
  // 运行时验证 + 类型安全
  const userData = CreateUserSchema.parse(body)
  return this.userService.create(userData)
}
```

</v-click>

---
layout: two-cols
layoutClass: gap-16
---

# Biome
现代化的工具链

<v-clicks>

## 统一工具

- **🚀 极速性能**
  - Rust 编写
  - 并行处理
  - 增量分析

- **🔧 多功能集成**
  - 代码格式化
  - 静态分析
  - 导入排序

- **⚙️ 零配置**
  - 开箱即用
  - 智能默认值
  - 渐进式采用

</v-clicks>

::right::

```json
// biome.json
{
  "$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error"
      },
      "style": {
        "noNegationElse": "off"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

<v-click>

```bash
# 格式化代码
biome format --write .

# 检查代码质量
biome lint .

# 修复可自动修复的问题
biome check --apply .
```

</v-click>

---
layout: center
---

# T3 Stack vs 企业级技术栈

<div class="grid grid-cols-2 gap-16 max-w-5xl mx-auto mt-16">
  <div class="glass p-8 rounded-2xl">
    <div class="text-center mb-8">
      <div class="text-4xl mb-4">🎯</div>
      <div class="text-2xl font-bold gradient-text">T3 Stack</div>
      <div class="text-sm opacity-70">个人/小型项目</div>
    </div>
    
    <div class="space-y-3">
      <div v-click class="flex items-center gap-3">
        <span class="text-green-500">✅</span>
        <span class="text-sm">快速原型开发</span>
      </div>
      <div v-click class="flex items-center gap-3">
        <span class="text-green-500">✅</span>
        <span class="text-sm">学习曲线平缓</span>
      </div>
      <div v-click class="flex items-center gap-3">
        <span class="text-red-500">❌</span>
        <span class="text-sm">单体架构限制</span>
      </div>
      <div v-click class="flex items-center gap-3">
        <span class="text-red-500">❌</span>
        <span class="text-sm">大型项目扩展性</span>
      </div>
    </div>
  </div>
  
  <div class="glass p-8 rounded-2xl glow-animation">
    <div class="text-center mb-8">
      <div class="text-4xl mb-4">🏢</div>
      <div class="text-2xl font-bold gradient-text">企业级技术栈</div>
      <div class="text-sm opacity-70">大型企业项目</div>
    </div>
    
    <div class="space-y-3">
      <div v-click class="flex items-center gap-3">
        <span class="text-green-500">✅</span>
        <span class="text-sm">Monorepo 架构</span>
      </div>
      <div v-click class="flex items-center gap-3">
        <span class="text-green-500">✅</span>
        <span class="text-sm">微服务支持</span>
      </div>
      <div v-click class="flex items-center gap-3">
        <span class="text-green-500">✅</span>
        <span class="text-sm">更强的类型安全</span>
      </div>
      <div v-click class="flex items-center gap-3">
        <span class="text-green-500">✅</span>
        <span class="text-sm">企业级工具链</span>
      </div>
    </div>
  </div>
</div>

---
layout: two-cols
layoutClass: gap-16
---

# 技术选型对比

## API 层对比

<div class="space-y-4">

**tRPC (T3 Stack)**
- RPC 风格 API
- 紧耦合前后端
- 适合全栈 TypeScript 项目

**ts-rest (新技术栈)**
- RESTful API 设计
- 契约优先开发
- 更好的团队协作
- 支持多语言客户端

</div>

::right::

## 后端框架对比

<div class="space-y-4">

**Express/Fastify (传统)**
- 轻量级
- 灵活性高
- 需要更多配置

**Nest.js (企业级)**
- 结构化架构
- 内置最佳实践
- 更好的可维护性
- 企业级特性支持

</div>

---
layout: two-cols
layoutClass: gap-16
---

# 项目架构示例

```
my-enterprise-app/
├── apps/
│   ├── web/                 # Next.js 前端应用
│   ├── api/                 # Nest.js 后端应用
│   └── admin/               # 管理后台
├── packages/
│   ├── ui/                  # 共享 UI 组件
│   ├── contracts/           # ts-rest API 契约
│   ├── schemas/             # Zod 验证模式
│   └── utils/               # 共享工具函数
├── tools/
│   └── biome-config/        # Biome 配置
├── turbo.json
└── package.json
```

::right::

## 开发流程

<v-clicks>

1. **契约优先设计**
   - 定义 API 契约
   - 生成类型定义

2. **并行开发**
   - 前端基于契约开发
   - 后端实现契约

3. **类型安全保障**
   - 编译时检查
   - 运行时验证

4. **代码质量控制**
   - Biome 自动格式化
   - 统一代码风格

</v-clicks>

---
layout: center
class: text-center
---

# 实际应用场景

<div class="grid grid-cols-2 gap-8 mt-8">

<div class="bg-purple-500/10 p-6 rounded-lg">
  <div class="text-4xl mb-4">🏢</div>
  <h3>企业管理系统</h3>
  <p>多模块、多团队协作</p>
  <p>复杂的权限管理</p>
  <p>高并发处理需求</p>
</div>

<div class="bg-orange-500/10 p-6 rounded-lg">
  <div class="text-4xl mb-4">🛒</div>
  <h3>电商平台</h3>
  <p>微服务架构</p>
  <p>多端应用支持</p>
  <p>高性能要求</p>
</div>

<div class="bg-teal-500/10 p-6 rounded-lg">
  <div class="text-4xl mb-4">📊</div>
  <h3>数据分析平台</h3>
  <p>大量数据处理</p>
  <p>实时数据展示</p>
  <p>复杂的图表交互</p>
</div>

<div class="bg-pink-500/10 p-6 rounded-lg">
  <div class="text-4xl mb-4">🎓</div>
  <h3>在线教育平台</h3>
  <p>多媒体内容管理</p>
  <p>实时互动功能</p>
  <p>学习进度跟踪</p>
</div>

</div>

---
layout: two-cols
layoutClass: gap-16
---

# 性能对比

## 构建性能（基于 wangEditor-next 实测）

<div class="space-y-4">

**传统方案**
- 全量构建：5分12秒
- 增量构建：3分45秒
- node_modules：1.2GB
- 安装时间：3分钟

**Turbo Monorepo**
- 全量构建：1分48秒 (**65.4%** ⬇️)
- 增量构建：42秒 (**81.3%** ⬇️)
- node_modules：450MB (**62.5%** ⬇️)
- 安装时间：45秒 (**75%** ⬇️)

</div>

::right::

## 开发体验提升

<div class="space-y-4">

**wangEditor-next 项目收益**
- 启动时间减少：**68%**
- 代码共享率提高：**45%**
- 多项目联调效率：**80%** ⬆️

**工具链性能**
- Biome：~50ms 格式化
- ESLint + Prettier：~2-5s

**类型安全**
- ts-rest：编译时 + 运行时
- 传统 API：仅运行时验证

**错误发现**
- 编译阶段发现 90% 的类型错误
- 减少生产环境 bug

</div>

---
layout: center
class: text-center
---

# 迁移策略

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="bg-blue-500/10 p-4 rounded-lg">
  <h4 class="font-bold mb-2">阶段一</h4>
  <p class="text-sm">引入 Biome</p>
  <p class="text-sm">统一代码风格</p>
  </div>

<div class="bg-green-500/10 p-4 rounded-lg">
  <h4 class="font-bold mb-2">阶段二</h4>
  <p class="text-sm">迁移到 Monorepo</p>
  <p class="text-sm">重构项目结构</p>
</div>

<div class="bg-purple-500/10 p-4 rounded-lg">
  <h4 class="font-bold mb-2">阶段三</h4>
  <p class="text-sm">引入 ts-rest</p>
  <p class="text-sm">替换 API 层</p>
</div>

<div class="bg-orange-500/10 p-4 rounded-lg">
  <h4 class="font-bold mb-2">阶段四</h4>
  <p class="text-sm">后端迁移 Nest.js</p>
  <p class="text-sm">模块化重构</p>
</div>

<div class="bg-teal-500/10 p-4 rounded-lg">
  <h4 class="font-bold mb-2">阶段五</h4>
  <p class="text-sm">完善监控</p>
  <p class="text-sm">性能优化</p>
</div>

<div class="bg-pink-500/10 p-4 rounded-lg">
  <h4 class="font-bold mb-2">阶段六</h4>
  <p class="text-sm">团队培训</p>
  <p class="text-sm">最佳实践</p>
</div>

</div>

---
layout: center
---

# 总结

<div class="max-w-4xl mx-auto mt-16">
  <div class="text-center mb-16">
    <div v-click class="text-2xl gradient-text font-semibold mb-8">
      从 T3 Stack 到企业级解决方案的演进
    </div>
    <div v-click class="text-lg opacity-80">
      不是替代，而是<span class="gradient-text font-semibold">升级</span>
    </div>
  </div>
  
  <div class="grid grid-cols-2 gap-12">
    <div v-click class="glass p-6 rounded-2xl">
      <div class="text-xl font-semibold mb-4 gradient-text">核心收益</div>
      <div class="space-y-2 text-sm">
        <div>• 构建时间减少 <strong>65.4%</strong></div>
        <div>• 增量构建提升 <strong>81.3%</strong></div>
        <div>• 类型安全保障 <strong>90%+</strong></div>
        <div>• 开发体验大幅提升</div>
      </div>
    </div>
    
    <div v-click class="glass p-6 rounded-2xl">
      <div class="text-xl font-semibold mb-4 gradient-text">适用场景</div>
      <div class="space-y-2 text-sm">
        <div>• 大型企业项目</div>
        <div>• 多团队协作开发</div>
        <div>• 高性能要求应用</div>
        <div>• 长期维护系统</div>
      </div>
    </div>
  </div>
</div>

<div v-click class="text-center mt-16">
  <div class="text-lg opacity-80">
    选择合适的技术栈，让<span class="gradient-text font-semibold">开发更高效</span>
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
      <code>cycleccc</code>
    </div>
    <div>•</div>
    <div class="flex items-center gap-2">
      <div>PPT:</div>
      <code>github.com/cycleccc/notes</code>
    </div>
  </div>
</div>
