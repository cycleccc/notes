---

theme: z-blue

highlight: docco

---
---
theme: z-blue
highlight: docco
---

# 前言

本章从全局视角介绍 Vue.js 3.0 的设计思路，以及各个模块之间是如何协作的。

# 声明式的渲染UI

VueJS可以使用`模板语法`或JavaScript对象（或使用h函数将参数转化为JavaScript对象）来声明式

*模板语法*
~~~JavaScript
01 <h1 @click="handler"><span></span></h1>
~~~

*JavaScript对象*

~~~JavaScript
01 // h 标签的级别
02 let level = 3
03 const title = {
04   tag: `h${level}`, // h3 标签
05 }
~~~

*h函数转化为JavaScript对象*

h 函数是一个`辅助创建虚拟 DOM` 的工具函数，后续会将render()称为`渲染函数`,模板最终也会被`编译器`编译为渲染函数。

~~~JavaScript
01 import { h } from 'vue'
02
03 export default {
04   render() {
05     return h('h1', { onClick: handler }) // 虚拟 DOM
06   }
07 }
~~~

*Vue源码中的 h 函数实现*

![[Pasted image 20231218111407.png]]

# 初始渲染器

渲染器的作用就是把虚拟 DOM 渲染为真实 DOM。

## 实现一个简易的渲染器

~~~JavaScript
01 function renderer(vnode, container) {
02   // 使用 vnode.tag 作为标签名称创建 DOM 元素
03   const el = document.createElement(vnode.tag)
04   // 遍历 vnode.props，将属性、事件添加到 DOM 元素
05   for (const key in vnode.props) {
06     if (/^on/.test(key)) {
07       // 如果 key 以 on 开头，说明它是事件
08       el.addEventListener(
09         key.substr(2).toLowerCase(), // 事件名称 onClick ---> click
10         vnode.props[key] // 事件处理函数
11       )
12     }
13   }
14
15   // 处理 children
16   if (typeof vnode.children === 'string') {
17     // 如果 children 是字符串，说明它是元素的文本子节点
18     el.appendChild(document.createTextNode(vnode.children))
19   } else if (Array.isArray(vnode.children)) {
20     // 递归地调用 renderer 函数渲染子节点，使用当前元素 el 作为挂载点
21     vnode.children.forEach(child => renderer(child, el))
22   }
23
24   // 将元素添加到挂载点下
25   container.appendChild(el)
26 }
~~~

对于渲染器来说，它真正的`难点`在于需要`精确地找到 vnode 对象的变更点并且只更新变更的内容`。就上例来说，渲染器应该只更新元素对应改变的部分，而不需要再走一遍完整的创建元素的流程。

# 组件的本质
	组件就是一组 DOM 元素的封装

我们可以定义一个JavaScript对象为MyComponent

~~~JavaScript
01 const MyComponent = function () {
02   return {
03     tag: 'div',
04     props: {
05       onClick: () => alert('hello')
06     },
07     children: 'click me'
08   }
09 }
~~~

在Vue源码中会判断vnode的tag是否是对象或是字符串，如果是字符串则直接作为标签渲染，如果是对象或是函数则进入组件渲染函数,组件渲染函数做的事情也就是递归调用渲染函数将标签拼装为组件。

~~~JavaScript
01 const vnode = {
02   tag: MyComponent
03 }
~~~

~~~JavaScript
01 function mountComponent(vnode, container) {
02   // vnode.tag 是组件对象，调用它的 render 函数得到组件要渲染的内容（虚拟 DOM）
03   const subtree = vnode.tag.render()
04   // 递归地调用 renderer 渲染 subtree
05   renderer(subtree, container)
06 }
~~~

# 模板的工作原理

以我们熟知的.vue 文件为例，一个 .vue 文件就是一个组件：
~~~Vue
01 <template>
02   <div @click="handler">
03     click me
04   </div>
05 </template>
06
07 <script>
08 export default {
09   data() {/* ... */},
10   methods: {
11     handler: () => {/* ... */}
12   }
13 }
14 </script>
~~~

其中 \<template> 标签里的内容就是模板内容，编译器会`把模板内容编译成渲染函数`并添加到<script> 