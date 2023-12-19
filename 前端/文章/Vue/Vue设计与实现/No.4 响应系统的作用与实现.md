---
theme: z-blue
highlight: docco
---

# 前言

本章将从宏观视角讲述了 Vue.js 3.0 中响应系统的实现机制。从副作用函数开始，逐步实现一个完善的响应系统，还讲述了计算属性和 watch 的实现原理，同时讨论了在实现响应系统的过程中所遇到的问题，以及相应的解决方案。

# 响应式数据与副作用函数

副作用函数指的是会产生副作用的函数，如下：

~~~JavaScript
01 function effect() {
02   document.body.innerText = 'hello vue3'
03 }
~~~