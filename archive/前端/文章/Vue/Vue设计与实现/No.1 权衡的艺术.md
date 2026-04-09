---

theme: z-blue

highlight: docco

---
---
theme: z-blue
highlight: docco
---
# 前言
本章主要介绍从用户的开发体验、控制框架代码的体积、Tree-Shaking 的工作机制、框架产物、特性开关、错误处理、TypeScript 支持等几个方面出发，讨论了框架设计者在设计框架时应该考虑的内容。
# 提升用户的开发体验

衡量一个框架是否足够优秀的指标之一就是看它的开发体验如何，例如完善的报错信息、自定义的initCustomFormatter log封装等。

![Pasted image 20231215111416.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e68c604e7694c3ba426053c26421244~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=886&h=515&s=47979&e=png&b=1f1f1f)

# 控制框架代码的体积

这里讲到了使用rollup对Vue进行打包构建，以及Vue在缩小代码体积的一些措施，如告警代码通过rollup配置的__DEV__来控制是否使用，在正式环境中__DEV__为false，警告代码会被认定为不会被执行的死代码而不打包入最终代码。

	rollup 只是用于 Vue 发布文件的构建，对用户使用没有直接影响。
	
	之前用 webpack 打包，还是会自带一个小型的动态 module 加载机制，并且每个文件是包在一个模块函数里的。rollup 打包通过重命名 import binding 直接把所有文件的函数都放在同一个函数体里面... 所以最终出来的文件会小一些，并且初始化快个十几毫秒的样子。
	  
	作者：尤雨溪  
	链接：https://www.zhihu.com/question/37861778/answer/73847503  
	来源：知乎  

# 框架要做到良好的Tree-Shaking

想要实现 Tree-Shaking，必须满足一个条件，即模块`必须是ESM`（ES Module），因为 Tree-Shaking 依赖 ESM 的静态结构。

现在无论是 rollup.js 还是 webpack，都支持 Tree-Shaking。

使用 `__PURE__` 可以告诉rollup或webpack该函数不会产生副作用如果需要tree-shaking可以放心进行。

在编写框架的时候需要合理使用 `/*#__PURE__*/` 注释。如果你去搜索 Vue.js 3 的源码，会发现它大量使用了该注释。
如：

![Pasted image 20231213222126.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab0491fca118402e808ca06dc074f138~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1216&h=422&s=121774&e=png&b=202020)

# 框架应该输出怎样的构建产物
	在源码的dev.js中可以看到Vue在输出资源时有iife、cjs、esm三种格式。


<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6e2c2c7e21d4102a4d12c4aaabe75d5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=495&h=367&s=28167&e=png&b=1f1f1f" alt="Pasted image 20231213115101.png"  /></p>

# IIFE格式

有时用户会希望可以直接在 HTML 页面中使用 \<script>标签引入框架并使用。

~~~JavaScript
01 <body>
02   <script src="/path/to/vue.js"></script>
03   <script>
04   const { createApp } = Vue
05   // ...
06   </script>
07 </body>
~~~

vue.global.js就是IIFE格式的资源可以方便用户直接通过src引入调用

~~~
01 var Vue = (function(exports){
02   // ...
03   exports.createApp = createApp;
04   // ...
05   return exports
06 }({}))
~~~

# ESM格式

在vue源码中ESM格式文件也有两种，用于浏览器的vue.runtime.esm-browser.js和用于打包工具使用的vue.runtime.esm-bundler.js。

# CJS格式

当进行服务端渲染时，Vue.js 的代码是在 Node.js 环境中运行的，而非浏览器环境。在 Node.js 环境中，资源的模块格式应该是CommonJS，简称 cjs。为了能够输出 cjs 模块的资源，我们可以通过修改 rollup.config.js 的配置 format: 'cjs' 来实现。

# 特性开关

	在设计框架时，框架会给用户提供诸多特性（或功能），例如我们提供 A、B、C 三个特性给用户，同时还提供了 a、b、c 三个对应的特性开关，用户可以通过设置 a、b、c 为 true 或false 来代表开启或关闭对应的特性。

比如用户在 Vue.js 3 中仍然可以使用选项 API 的方式编写代码，这时vue源码中的__VUE_OPTIONS_API__变量就会控制打包时shaking掉Composition API这一部分的代码。

# 错误处理

在源码中提供了`registerErrorHandler` 函数，用户可以使用它注册错误处理程序，然后在 callWithErrorHandling 函数内部捕获错误后，把错误传递给用户注册的错误处理程序。

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41f51875c507469fa2650d211fd24747~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=593&h=179&s=16296&e=png&b=1f1f1f" alt="Pasted image 20231215105551.png"  /></p>

这样可以保证用户侧的代码简介健壮。

~~~
01 import utils from 'utils.js'
02 // 注册错误处理程序
03 utils.registerErrorHandler((e) => {
04   console.log(e)
05 })
06 utils.foo(() => {/*...*/})
07 utils.bar(() => {/*...*/})
~~~

# 良好的 TypeScript 类型支持

Vue.js 源码中的 runtime-core/src/apiDefineComponent.ts 文件，整个文件里真正会在浏览器中运行的代码其实只有 *3 行*，但是全部的代码接近 *300 行*，其实这些代码都是在为类型支持服务。由此可见，框架想要做到完善的类型支持，需要付出相当大的努力。

<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/194f3bee3331452199e2b21108ce7728~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=703&h=282&s=34896&e=png&b=1f1f1f" alt="Pasted image 20231215111150.png"  /></p>

# 总结
本章节内容主要介绍了Vue框架通过完善的开发体验、代码体积控制、Tree-Shaking、构建产物输出、特性开关、错误处理以及良好的TypeScript类型支持，提供了强大而友好的开发环境，为开发者提供了便捷、高效的工具。从框架设计的视角引领读者学习Vue的设计思想，后续章节将会更详细的介绍Vue的设计思路。
