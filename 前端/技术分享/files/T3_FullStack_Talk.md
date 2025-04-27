---
marp: true
size: 16:9
theme: am_blue
paginate: true
headingDivider: [2,3]
footer: \ *cycleccc* *ts 全栈最佳实践* *2025年2月28日*
---


<!-- _class: cover_a 
<!-- _header: "" --> 
<!-- _footer: "" --> 
<!-- _paginate: "" --> 

# T3 Fullstack 技术分享

###### “全栈の奥义：用Next.js在老板眼皮底下摸鱼🐟”

@cycleccc
全网账号：cycleccc
发布时间：2025年2月28日
<2991205548@qq.com>
PPT(md) 地址：[GitHub库](https://github.com/cycleccc/notes)

## 什么是 T3 Stack？

<!-- _class: cols2_ol_ci fglass toc_a  -->
<!-- _footer: "" -->
<!-- _header: "CONTENTS" -->
<!-- _paginate: "" -->

- [🧑‍💻为什么选择 T3 Stack](#1)
- [🌐Next.js](#2) 
- [🔥TRPC](#3)
- [✅Zod](#4)
- [📦Prisma](#5)
- [🛡️NextAuth](#6)
- [🎨Ant Design Pro](#7)
- [🎯Shadcn UI](#8)
<!-- - [需要知道的基础知识](#56) -->
<!-- - [最后一页](#59) -->

## 1. 为什么选择 T3 Stack？

<!-- _class: trans -->
<!-- _footer: "" -->
<!-- _paginate: "" -->

## 1. 为什么选择 T3 Stack？


为什么选择 T3 stack，或是说为什么选择 Next,不选择 PHP？

- **高效开发**：T3 Stack 提供了 TypeScript 和 tRPC，帮助开发者快速构建高效的应用程序，减少了常见的错误和调试时间。
- **强大的生态系统**：结合 Next.js 和 Prisma，开发者可以轻松实现服务端渲染和数据库操作，提升应用性能和用户体验。
- **灵活的样式**：使用 Tailwind CSS，开发者可以快速构建响应式设计，确保应用在各种设备上都能完美呈现。
- **安全性**：NextAuth 提供了强大的认证机制，确保用户数据的安全性，让开发者可以专注于业务逻辑，而不必担心安全问题。

因为我们搞前端的就喜欢这个样子啊！任何事情都喜欢一把梭，不能一把梭就给任何不能一把梭的东西写 polyfill，最后达成心满意足的一把梭。


## 2. Next.js 全栈开发基石

<!-- _class: trans -->
<!-- _footer: "" -->
<!-- _paginate: "" -->

## 2.1 文件路由

<!-- _class: cols-2 -->

<div class=ldiv>

~~~markdown
app/
  ├─ layout.tsx          → 全局结界
  ├─ page.tsx            → /
  ├─ (marketing)/
  │   ├─ about/
  │   │   └─ page.tsx    → /about
  │   └─ blog/
  │       └─ [slug]/
  │           └─ page.tsx → /blog/:slug
  └─ (dashboard)/
      └─ user/
          └─ [id]/
              └─ page.tsx → /user/:id
~~~

</div>



<div class=rdiv>

| 文件名 | 使用示例  | 独特技能 |
| --------- | ----------- | --------- |
| `layout` | 共享导航/样式/状态 | 嵌套继承布局 |
| `page` | 实际渲染的组件 | 必须存在否则404 |
| `loading` | 展示骨架屏/加载动画 | 自动绑定页面加载状态 |
| `error` | 展示错误边界 | 精准捕获子树错误 |
| `not-found` | 展示 404 页面 | 自动展示 |
| `(dashboard)` | 路由分组 | 按功能分类 |
| `[id]` | 路由参数 | 动态路由 |
| `@admin` | 平行路由 | 按权限分类 |

</div>

## 2.2 API 路由

<!-- _class: pin-3 -->

<div class="tdiv">

> 🔧 底层原理简述
Next.js 在构建时会：
 识别 app/api 或 pages/api 目录下的文件,不打包进客户端，只在服务端运行 自动根据路径注册为服务端函数
在运行时，Next.js 会：
根据请求路径 /api/user/123 映射到本地函数文件,将 req, res 注入函数（类 Express，但基于 Node 原生）
</div>

<div class=ldiv>

~~~markdown
app/api/
  ├─ hello.ts        → /api/hello
  └─ user/
      └─ [id].ts    → /api/user/:id
~~~

</div>

<div class=rdiv>

~~~typescript
// 传统方式：跨项目、跨域、跨团队沟通
fetch('https://api.example.com/user/123')

// Next.js方式：像调用本地函数一样简单,直接相对路径调用
fetch('/api/user/123')
~~~
</div>


## 2.3 渲染模式概览

<!-- _class: lead -->

### Next.js 支持多种渲染模式  
结合服务端和客户端的能力，实现灵活的页面渲染方案：

- ✅ SSG：静态生成（Static Site Generation）
- ✅ SSR：服务端渲染（Server Side Rendering）
- ✅ CSR：客户端渲染（Client Side Rendering）
- ✅ ISR：增量静态生成（Incremental Static Regeneration）

---

## 🧊 SSG - 静态生成

<!-- _class: pin-3 -->

<div class=ldiv>

适合：**内容不频繁变化**的页面

~~~ts
export async function getStaticProps() {
  return {
    props: { data: ... },
  }
}
~~~

优点：

- HTML 在构建时生成，**加载快**
- 可部署在 CDN

缺点：

- 数据更新需**重新构建**

</div>

<div class=rdiv>

```txt
浏览器
   ↓
CDN / 静态文件
   ↓
直接返回 HTML
```

</div>

---

## 🔁 SSR - 服务端渲染

<!-- _class: pin-3 -->

<div class=ldiv>

适合：**数据实时性要求高**的页面

~~~ts
export async function getServerSideProps(context) {
  const res = await fetch(...)
  return { props: { data: await res.json() } }
}
~~~

优点：

- 每次请求都会重新渲染页面
- SEO 友好

缺点：

- **性能依赖服务器**
- 响应速度相对慢

</div>

<div class=rdiv>

```txt
浏览器
   ↓
Next.js Server
   ↓
动态生成 HTML
```

</div>

## 🖼️ CSR - 客户端渲染

<!-- _class: pin-3 -->

<div class=ldiv>

适合：**登录后页面 / 不关心 SEO**

页面只在浏览器中执行 JS 后渲染：

~~~ts
// 没有 getStaticProps / getServerSideProps
// 在 useEffect 中加载数据
~~~

优点：

- 无需服务器参与，**部署简单**
- 体验流畅

缺点：

- SEO 不友好
- 首屏加载慢

</div>

<div class=rdiv>

```txt
浏览器
   ↓
获取空 HTML + JS
   ↓
JS 渲染出页面内容
```

</div>


## 🔄 ISR - 增量静态生成

<!-- _class: pin-3 -->

<div class=ldiv>

SSG 的升级版：支持**定时更新**

~~~ts
export async function getStaticProps() {
  return {
    props: { ... },
    revalidate: 60, // 60 秒后重新生成
  }
}
~~~

优点：

- **静态性能 + 数据更新**
- 避免频繁构建

适合：**博客、商品页**等内容不实时但需定期更新的页面

</div>

<div class=rdiv>

```txt
请求页面时发现超时
   ↓
后台重新生成 HTML
   ↓
更新静态缓存
```

</div>


## 🤔 应该怎么选？

<!-- _class: lead -->

| 模式 | 适用场景 | 是否支持 SEO | 首屏加载速度 |
|------|----------|---------------|----------------|
| SSG  | 博客、文档、产品页 | ✅ | 🚀 非常快 |
| SSR  | 用户仪表盘、搜索页 | ✅ | 🐢 较慢 |
| CSR  | 后台管理、互动页面 | ❌ | 🐢 慢（需加载 JS）|
| ISR  | 新闻页、电商页面等 | ✅ | 🚀 快且可更新 |


## 3. TRPC: 类型安全通信

<!-- _class: trans -->
<!-- _footer: "" -->
<!-- _paginate: "" -->

## 3.1 TRPC 原理与使用

<!-- _class: cols-2 -->  
<div class=ldiv>

灵魂暴击三连问
- 接口文档还要手动维护？
- Postman收藏夹比相亲对象还多？
- 字段名讨论会开成拼写纠察队？

~~~typescript
### 前端程序员の日常

const res = await fetch('/api/user/114514');
const data = await res.json(); // 可能是用户数据，也可能是 nul
console.log(data.avater); // 哦豁，拼错了avatar
~~~

~~~typescript
### 当你用tRPC时

const { data } = trpc.user.getById.query(114514);
// 只要后端敢返回没有avater字段，编译时就送你一首《凉凉》 ❄️
~~~

</div>
<div class=rdiv>

~~~typescript
// 定义一个精简的router
const appRouter = router({
  getCoffee: procedure
    .input(z.object({
      mode: z.enum(['深度工作', '协作会议']), // 工作状态智能识别
      focusMode: z.boolean()
    }))
    .query(({ input }) => input.focusMode
      ? '高效编码中...' 
      : db.coffee.findRandom()
    )
})

~~~

~~~typescript
// 像调用本地函数一样调接口
function ProductivityButton() {
  const { data } = trpc.getCoffee.useQuery({
    mode: '深度工作',
    focusMode: useStore(state => state.isFocusMode)
  })

  return <Button>{data || '正在获取咖啡灵感...'}</Button>
}
~~~
</div>

## 3.2 TRPC 使用预览
![test](./trpc.gif)


## 4. Prisma

## 《荷塘月色》（两栏五五分）

<!-- _class: cols-2 -->

<div class=ldiv>

曲曲折折的荷塘上面，弥望的是田田的叶子。叶子出水很高，像亭亭的舞女的裙。

层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。

微风过处，送来缕缕清香，仿佛远处高楼上渺茫的歌声似的。这时候叶子与花也有一丝的颤动，像闪电般，霎时传过荷塘的那边去了。

叶子本是肩并肩密密地挨着，这便宛然有了一道凝碧的波痕。叶子底下是脉脉的流水，遮住了，不能见一些颜色；而叶子却更见风致了。

—— 朱自清《荷塘月色》  [返回](#21)
</div>

<div class=rimg>

<!-- ![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309221014499.png) -->
![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309221630151.png)
</div>

## 《春》（两栏六四分）

<!-- _class: cols-2-64 -->

<div class=limg>

![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309201217248.png)
</div>

<div class=rdiv>

盼望着，盼望着，东风来了，春天的脚步近了。

一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。

小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。

—— 朱自清《春》

[返回](#21)
</div>

## 经典散文诗篇（两栏七三分）

<!-- _class: cols-2-73 -->

<div class=limg>

![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309221010523.png)

</div>

<div class=rdiv>

经典的散文诗篇有：

- 朱自清：《荷塘月色》
- 林清玄：《月到天心》
- 郁达夫：《古都的秋》
- 张爱玲：《花落的声音》
- 余光中：《听听那冷雨》
- 张抗抗：《牡丹的拒绝》
- 丰子恺：《杨柳》
- 周作人：《乌篷船》
- 郑振铎：《石湖》
- 梁实秋：《雅舍》

[返回](#21)
</div>

## 《春》（两栏四六分）

<!-- _class: cols-2-46 -->

<div class=ldiv>


盼望着，盼望着，东风来了，春天的脚步近了。

一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。

小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。

—— 朱自清《春》

[返回](#21)
</div>

<div class=rimg>

![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309201217248.png)
</div>

## 经典散文诗篇（两栏三七分）

<!-- _class: cols-2-37 -->

<div class=ldiv>


经典的散文诗篇有：

- 朱自清：《荷塘月色》
- 林清玄：《月到天心》
- 郁达夫：《古都的秋》
- 张爱玲：《花落的声音》
- 余光中：《听听那冷雨》
- 张抗抗：《牡丹的拒绝》
- 丰子恺：《杨柳》
- 周作人：《乌篷船》
- 郑振铎：《石湖》
- 梁实秋：《雅舍》

[返回](#21)
</div>

<div class=rimg>

![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309221010523.png)
</div>

## 夏与秋（三栏三平分）

<!-- _class: cols-3 -->

<div class=ldiv>

![#center](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309201206630.png)

</div>

<div class=mdiv>

![#center](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309201151809.png)

![#center](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309201158036.png)
</div>

<div class=rdiv>

![#center](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202309201154535.png)

[返回](#21)
</div>


## 高山与沙漠（两行分栏）

<!-- _class: rows-2 -->

<div class="timg">

![#c h:250](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202401131736186.png)
</div>

<div class="bimg">

![#c h:260](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202401131737821.png)
</div>

## 《宇宙的奥秘》（品字型分栏）

<!-- _class: pin-3 -->

<div class="tdiv">

> 四百年前，两位截然不同的科学家突破了当时已知世界的边界。1609 年在威尼斯，伽利略・伽利雷透过望远镜观察星辰，并制作仪器和进行实验。在布拉格，科班出身的神学家约翰内斯・开普勒发现了行星运动定律，奠定了近代天体物理学的基础，并思考着宇宙的宏伟构造。托马斯・德・帕多瓦以至今较少受到关注却扣人心弦的通信往来为基础，讲述了这两位类型如此迥异的学者之间不对等的关系，以及他们如何在同样的时刻却以各自的方式探索星辰的奥秘。在彼此的鉴照下，他们的远见与固执、睿智与无知得以呈现。这是一部介绍新科学的崛起以及近代来临之际的巨大变革的作品。  ——《宇宙的奥妙》
</div>

<div class="limg">

![#c](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202401131712626.png)
</div>

<div class="rimg">

![#c h:260](https://mytuchuang-1303248785.cos.ap-beijing.myqcloud.com/picgo/202401131713779.png)
</div>

[^1]: 
