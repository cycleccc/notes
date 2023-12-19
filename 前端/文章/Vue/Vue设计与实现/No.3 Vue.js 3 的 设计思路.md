---

theme: z-blue

highlight: docco

---
---
theme: z-blue
highlight: docco
---

# 前言

本章将从全局视角介绍 Vue.js 3.0 的设计思路，以及各个模块之间是如何协作的。

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

![Pasted image 20231218111407.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92faa5ae3fcb4335b4fb5b6e99051b7d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=723&h=467&s=48616&e=png&b=1f1f1f)

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

其中 \<template> 标签里的内容就是模板内容，编译器会`把模板内容编译成渲染函数`并添加到<\script> 组件对象上

~~~JavaScript
01 export default {
02   data() {/* ... */},
03   methods: {
04     handler: () => {/* ... */}
05   },
06   render() {
07     return h('div', { onClick: handler }, 'click me')
08   }
09 }
~~~

*Vue.js的渲染过程*

无论是使用模板还是直接手写渲染函数，对于一个组件来说，它要渲染的内容最终都是通过渲染函数产生的，然后渲染器再把渲染函数返回的虚拟 DOM 渲染为真实 DOM，这就是模板的工作原理，也是 Vue.js 渲染页面的流程。

# Vue.js 是各个模块组成的有机整体

> 组件的实现依赖于`渲染器`，模板的编译依赖于`编译器`。

举个例子，组件中id往往是不易改变的，而class确实会经常改变的，如果我们能在模板编译时区分出哪些是会经常改变的内容，将这些信息提取出来，然后直接交给渲染器。

~~~JavaScript
01 <div id="foo" :class="cls"></div>
~~~

我们一眼就能看出其中 id="foo" 是`永远不会变化`的，而:class="cls" 是一个 v-bind 绑定，它是可能发生变化的。所以编译器能识别出哪些是`静态属性`，哪些是`动态属性`，在生成代码的时候完全可以`附带`这些信息：

~~~JavaScript
01 render() {
02   return {
03     tag: 'div',
04     props: {
05       id: 'foo',
06       class: cls
07     },
08     patchFlags: 1 // 假设数字 1 代表 class 是动态的
09   }
10 }
~~~

# 总结

本章介绍了声明式描述 UI 的概念，强调了Vue.js作为声明式框架的优势，通过模板和虚拟DOM实现UI描述。渲染器的基本原理是将虚拟DOM渲染为真实DOM，采用Diff算法实现高效更新。对组件的讨论揭示了其本质是虚拟DOM元素的封装，可以是函数或对象，渲染器通过执行组件的渲染函数获取内容，并递归渲染。最后，强调编译器和渲染器是Vue.js的核心组成部分，它们协同工作以提高框架性能。