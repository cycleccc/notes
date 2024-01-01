---
theme: z-blue
highlight: docco
---

# 前言

本章将从宏观视角讲述了 Vue.js 3.0 中响应系统的实现机制。从副作用函数开始，逐步实现一个完善的响应系统，还讲述了计算属性和 watch 的实现原理，同时讨论了在实现响应系统的过程中所遇到的问题，以及相应的解决方案。

# 注

> 本章后续内容完整实例皆用沙盒链接展示，可点击链接查看完整实例。

# 响应式数据与副作用函数

副作用函数指的是会产生副作用的函数，如下：

~~~JavaScript
01 function effect() {
02   document.body.innerText = 'hello vue3'
03 }
~~~

## 副作用函数

--- 
effect 函数的执行会直接或间接影响其他函数的执行，这时我们说 effect 函数产生了副作用。
---

我们在刚开始学习时容易将副作用函数理解成，响应式数据修改后产生的副作用，这是错误的理解，正确的理解是：`effect函数产生了副作用`。

**纯函数**
与副作用函数相反的则是`纯函数`，即没有副作用的函数。纯函数对于相同的输入始终`产生相同的输出`，并且`不会修改外部状态`。

## 响应式数据

---
这句代码修改了字段 obj.text 的值，我们希望`当值变化后，副作用函数自动重新执行`，如果能实现这个目标，那么对象 obj 就是`响应式数据`。
---

# 响应式数据的基本实现

首先，我们创建了一个用于存储副作用函数的桶 `bucket`，它是 Set 类型。接着定义原始数据 data，obj 是原始数据的`代理对象`，我们分别设置了 get 和 set `拦截函数`，用于拦截读取和设置操作。当读取属性时将副作用函数 effect `添加到桶`里，即 bucket.add(effect)，然后`返回属性值`；当设置属性值时先更新原始数据，再将副作用函数从桶里`取出并重新执行`，这样我们就实现了响应式数据。

~~~JavaScript
// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello world' }
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到存储副作用函数的桶中
    bucket.add(effect)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    bucket.forEach(fn => fn())
    // 返回 true 代表设置操作成功
    return true
  }
})

// 副作用函数
function effect() {
  document.body.innerText = obj.text
}
// 执行副作用函数，触发读取
effect()
// 1 秒后修改响应式数据
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)
~~~

# 设计一个完善的响应系统

在刚刚的例子中我们实现了一个简易的响应式系统，其中只包括两个操作：

- 当读取操作发生时，将副作用函数收集到“桶”中；
- 当设置操作发生时，从“桶”中取出副作用函数并执行。


## 提供一个用来注册副作用函数的机制

~~~JavaScript
 // 用一个全局变量存储被注册的副作用函数
 let activeEffect
 // effect 函数用于注册副作用函数
 function effect(fn) {
   // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
   activeEffect = fn
   // 执行副作用函数
   fn()
 }
 ~~~

## 使用WeakMap代替Set作为bucket的数据结构
~~~JavaScript
// 存储副作用函数的桶
const bucket = new WeakMap()
~~~

**根据WeakMap修改拦截器get/set代码**

bucket其实是一个`三层结构`，WeakMap里还套了一层Map用于查找到每个响应式数据（第一层WeakMap的Key）的每一个属性（第二层Map的Key）对应的effect函数（第三层Map的值Set）

~~~JavaScript
 const obj = new Proxy(data, {
   // 拦截读取操作
   get(target, key) {
     // 没有 activeEffect，直接 return
     if (!activeEffect) return target[key]
     // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
     let depsMap = bucket.get(target)
     // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
     if (!depsMap) {
       bucket.set(target, (depsMap = new Map()))
    }
     // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
     // 里面存储着所有与当前 key 相关联的副作用函数：effects
     let deps = depsMap.get(key)
     // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
     if (!deps) {
       depsMap.set(key, (deps = new Set()))
     }
     // 最后将当前激活的副作用函数添加到“桶”里
     deps.add(activeEffect)

    // 返回属性值
     return target[key]
   },
   // 拦截设置操作
   set(target, key, newVal) {
     // 设置属性值
     target[key] = newVal
     // 根据 target 从桶中取得 depsMap，它是 key --> effects
     const depsMap = bucket.get(target)
     if (!depsMap) return
   // 根据 key 取得所有副作用函数 effects
    const effects = depsMap.get(key)
     // 执行副作用函数
     effects && effects.forEach(fn => fn())
   }
 })
~~~


从这段代码可以看出构建数据结构的方式，我们分别使用了WeakMap、Map 和 Set：

- WeakMap 由 target --> Map 构成；
- Map 由 key --> Set 构成。

其中 WeakMap 的键是原始对象 target，WeakMap 的值是一个Map 实例，而 Map 的键是原始对象 target 的 key，Map 的值是一个由副作用函数组成的 Set。

在Vue2中并没有effect副作用函数这一说法，都是称之为deps依赖。其实Vue3的effct就是`deps依赖`

将上文代码封装到track和trigger函数中，此处要知道track（追踪）和trigger（触发）

## 封装track和trigger函数

~~~JavaScript
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key)
    // 返回属性值
    return target[key]
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数从桶里取出并执行
    trigger(target, key)
  }
})

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => fn())
}
~~~

#分支切换与cleanup

~~~JavaScript
const data = { ok: true, text: 'hello world' }
const obj = new Proxy(data, { /* ... */ })

effect(function effectFn() {
  document.body.innerText = obj.ok ? obj.text : 'not'
})
~~~

## 遗留的副作用函数
当obj.ok为初始值为true时会收集obj.text的依赖，而当后续obj.ok为false时再修改obj.text时text属性不应该触发effect函数，因为修改了text属性该effect函数执行后也不会产生作用。

##  使用 activeEffect 记录当前激活的副作用函数

~~~JavaScript
// 用一个全局变量存储被注册的副作用函数
let activeEffect
function effect(fn) {
  const effectFn = () => {
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    fn()
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  // 执行副作用函数
  effectFn()
}
~~~

## track函数中进行双向依赖收集

~~~JavaScript
function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  // 把当前激活的副作用函数添加到依赖集合 deps 中
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps) // 新增
}
~~~

在 track 函数中我们将当前执行的副作用函数activeEffect 添加到依赖集合 deps 中，这说明 deps 就是一个与当前副作用函数存在联系的依赖集合，于是我们也把它添加到activeEffect.deps 数组中，这样就完成了对依赖集合的收集。

这里有一个循环依赖可能比较难以理解，其实此处要表达的是effct函数和对象属性是双向多重连接，既要将对象属性添加到effct函数关联的对象属性数组中，又要将effct函数添加到对象属性deps关联的set上（如下图红框中的双向收集）。

![[Pasted image 20231225174613.png]]

## effect函数执行清除旧依赖

根据 effectFn.deps 获取所有相关联的依赖集合，进而将副作用函数从依赖集合中移除

~~~JavaScript
function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i]
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}
~~~

	本节完整示例
[分支切换与cleanup](https://code.juejin.cn/api/raw/7316742269283860518?id=7316742269283909670)

# 嵌套的 effect 与 effect 栈

effect 是可以发生嵌套的，常见的是在A组件中渲染了B组件，就会产生嵌套effect。

**嵌套effect**
~~~JavaScript
effect(function effectFn1() {
  effect(function effectFn2() { /* ... */ })
  /* ... */
})
~~~

使用上节的代码运行以下例子会发现当activeEffect修改为effectFn2后不会在执行effectFn1。

当副作用函数发生嵌套时，内层副作用函数的执行会覆盖 activeEffect 的值，并且永远不会恢复到原来的值。

~~~JavaScript
// 原始数据
const data = { foo: true, bar: true }
// 代理对象
const obj = new Proxy(data, { /* ... */ })

// 全局变量
let temp1, temp2

// effectFn1 嵌套了 effectFn2
effect(function effectFn1() {
  console.log('effectFn1 执行')

  effect(function effectFn2() {
    console.log('effectFn2 执行')
    // 在 effectFn2 中读取 obj.bar 属性
    temp2 = obj.bar
  })
  // 在 effectFn1 中读取 obj.foo 属性
  temp1 = obj.foo
})
~~~

## 使用栈存储当前activeEffect

使用栈来避免嵌套导致丢失上层的effect函数

~~~JavaScript
// 用一个全局变量存储当前激活的 effect 函数
let activeEffect
// effect 栈
const effectStack = []  // 新增

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn)  // 新增
    fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop()  // 新增
    activeEffect = effectStack[effectStack.length - 1]  // 新增
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
  effectFn.deps = []
  // 执行副作用函数
  effectFn()
}
~~~

**本节完整示例**
[嵌套effect](https://code.juejin.cn/api/raw/7317941861824495654?id=7317941861824544806)

## 避免无线递归循环

在我们现有的代码下如果effecct中有自增操作obj.foo++会导致无限循环引起栈溢出错误

~~~JavaScript
const data = { foo: 1 }
const obj = new Proxy(data, { /*...*/ })

effect(() => obj.foo++)
~~~

这个问题也很好解决，只要特判一下**如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行**

~~~
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {  // 新增
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => effectFn())
  // effects && effects.forEach(effectFn => effectFn())
}
~~~

**本节完整示例**
[嵌套effect](https://code.juejin.cn/api/raw/7317945990617497650?id=7317945990617546802)

## 调度执行

所谓**可调度**，指的是当 trigger 动作触发副作用函数重新执行时，有能力决定副作用函数执行的时机、次数以及方式。

effect函数添加第二个参数options，允许指定scheduler调度函数，有了调度函数，我们在trigger函数中触发副作用函数重新执行时，就可以直接调用用户传递的调度器函数，从而把控制权交给用户。

## effect函数添加参数
~~~JavaScript
effect(
  () => {
    console.log(obj.foo)
  },
  // options
  {
    // 调度器 scheduler 是一个函数
    scheduler(fn) {
      // ...
    }
  }
)
~~~

## effect函数内部选项挂载到副作用函数
~~~JavaScript
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压栈
    effectStack.push(effectFn)
    fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  // 将 options 挂载到 effectFn 上
  effectFn.options = options  // 新增
  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
  effectFn.deps = []
  // 执行副作用函数
  effectFn()
}
~~~

## trigger函数添加options判断

~~~JavaScript
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {  // 新增
      effectFn.options.scheduler(effectFn)  // 新增
    } else {
      // 否则直接执行副作用函数（之前的默认行为）
      effectFn()  // 新增
    }
  })
}
~~~