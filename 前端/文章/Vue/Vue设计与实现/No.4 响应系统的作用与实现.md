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

当obj.ok为初始值为true时会收集obj.text的依赖，而当后续obj.ok为false时再修改obj.text时text属性不应该触发effect函数，因为修改了text属性该effect函数执行后也不会产生作用。

