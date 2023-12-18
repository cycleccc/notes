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

h 函数是一个`辅助创建虚拟 DOM` 的工具函数

~~~JavaScript
01 import { h } from 'vue'
02
03 export default {
04   render() {
05     return h('h1', { onClick: handler }) // 虚拟 DOM
06   }
07 }
~~~

# 初始渲染器
