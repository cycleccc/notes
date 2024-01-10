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

effect 函数的执行会直接或间接影响其他函数的执行，这时我们说 effect 函数产生了副作用。


我们在刚开始学习时容易将副作用函数理解成，响应式数据修改后产生的副作用，这是错误的理解，正确的理解是：`effect函数产生了副作用`。

**纯函数**
与副作用函数相反的则是`纯函数`，即没有副作用的函数。纯函数对于相同的输入始终`产生相同的输出`，并且`不会修改外部状态`。

## 响应式数据

这句代码修改了字段 obj.text 的值，我们希望`当值变化后，副作用函数自动重新执行`，如果能实现这个目标，那么对象 obj 就是`响应式数据`。


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

# 分支切换与cleanup

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


![Pasted image 20231225174613.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f8f4dc5b3e64929ace595d8efefb6b7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2734&h=1413&s=365761&e=png&b=ffffff)

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

## 完整代码
> [分支切换与cleanup](https://code.juejin.cn/api/raw/7316742269283860518?id=7316742269283909670)

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

## 完整代码
> [嵌套effect](https://code.juejin.cn/api/raw/7317941861824495654?id=7317941861824544806)

# 避免无线递归循环

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

## 完整代码
> [避免无限递归](https://code.juejin.cn/api/raw/7317945990617497650?id=7317945990617546802)

# 调度执行

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

## 控制执行次数

关键点：
- 使用宏任务微任务机制，让effectFn函数滞后执行
- 使用set排除重复的effect副作用函数

~~~JavaScript
// 定义一个任务队列
const jobQueue = new Set()
// 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列
const p = Promise.resolve()

// 一个标志代表是否正在刷新队列
let isFlushing = false
function flushJob() {
  // 如果队列正在刷新，则什么都不做
  if (isFlushing) return
  // 设置为 true，代表正在刷新
  isFlushing = true
  // 在微任务队列中刷新 jobQueue 队列
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    // 结束后重置 isFlushing
    isFlushing = false
  })
}


effect(() => {
  console.log(obj.foo)
}, {
  scheduler(fn) {   // 每次调度时，将副作用函数添加到 jobQueue 队列中
    jobQueue.add(fn)
    // 调用 flushJob 刷新队列
    flushJob()
  }
})

obj.foo++
obj.foo++
~~~

通过宏任务微任务与set，console.log最终只会执行一次两次（读取一次，自增两次只触发一次）。

## 完整代码
> [嵌套effect](https://code.juejin.cn/api/raw/7319393509704728585?id=7319393509704777737)

# 计算属性computed与lazy

## 计算属性介绍

计算属性是用来声明式的描述一个值依赖了其它的值。lazy选项用来延迟计算属性的触发时机，只当读取计算属性值时才触发。

## option扩展lazy选项

通过添加lazy选项表示effect不主动执行，通过dirty标志来确定effct只在读取时调用trigger执行。

~~~JavaScript
// 把 getter 作为副作用函数，创建一个 lazy 的 effect
const effectFn = effect(getter, {
  lazy: true,
  scheduler() {
    if (!dirty) {
      dirty = true
      // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
      trigger(obj, 'value')
    }
  }
})
~~~

## effect添加返回值

effect添加返回值，在读取.value时再触发effect并获取值

~~~JavaScript
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压栈
    effectStack.push(effectFn)
    // 将 fn 的执行结果存储到 res 中
    const res = fn()  // 新增
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  // 将 options 挂载到 effectFn 上
  effectFn.options = options  // 新增
  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合
  effectFn.deps = []
  // 只有非lazy的时候，才执行
  if (!options.lazy) {
    // 执行副作用函数
    effectFn()
  }
  return effectFn;
}
~~~

## 实现计算属性

核心思想是对effect进行了二次包裹，监听effect中的属性改变时更改缓存，读取value执行effect。

~~~JavaScript
function computed(getter) {
  // value 用来缓存上一次计算的值
  let value
  // dirty 标志，用来标识是否需要重新计算值
  let dirty = true
  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true
        // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value')
      }
    }
  })

  const obj = {   // 当读取 value 时才执行 effectFn  
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj,'value')
      return value
    }
  }

  return obj

}
~~~

## 完整代码
> [计算属性](https://code.juejin.cn/api/raw/7319683452458238004?id=7319683452458287156)

# watch的实现原理

## watch介绍
本质是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。

实现起来非常简单通过调度执行这一节的scheduler就可以实现。

## 封装一个watch函数

通过原有的effct函数加上scheduler选项即可封装watch

~~~JavaScript
// watch 函数接收两个参数，source 是响应式数据，cb 是回调函数
function watch (source, cb) {
    effect(
        // 触发读取操作，从而建立联系
        () => traverse(source),
        {
            scheduler () {
                // 当数据变化时，调用回调函数 cb
                cb()
            }
        }
    )
}
~~~

递归代理对象收集依赖属性
~~~JavaScript
function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value)
  // 暂时不考虑数组等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen)
  }

  return value
}
~~~

支持传入getter函数

~~~JavaScript
function watch(source, cb) {
  // 定义 getter
  let getter
  // 如果 source 是函数，说明用户传递的是 getter，所以直接把 source 赋值给 getter
  if (typeof source === 'function') {
    getter = source
  } else {
    // 否则按照原来的实现调用 traverse 递归地读取
    getter = () => traverse(source)
  }

  effect(
    // 执行 getter
    () => getter(),
    {
      scheduler() {
        cb()
      }
    }
  )
}
~~~

通过lazy选项，获取第一次调用时的值为旧值，后续监听触发时的值为新值。

~~~JavaScript
function watch(source, cb) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  // 定义旧值与新值
  let oldValue, newValue
  // 使用 effect 注册副作用函数时，开启 lazy 选项，并把返回值存储到 effectFn 中以便后续手动调用
  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler() {
        // 在 scheduler 中重新执行副作用函数，得到的是新值
        newValue = effectFn()
        // 将旧值和新值作为回调函数的参数
        cb(newValue, oldValue)
        // 更新旧值，不然下一次会得到错误的旧值
        oldValue = newValue
      }
    }
  )
  // 手动调用副作用函数，拿到的值就是旧值
  oldValue = effectFn()
}
~~~

## 完整代码
> [watch的实现原理](https://code.juejin.cn/api/raw/7319683452458238004?id=7319683452458287156)

# 立即执行的watch与回调执行时机

watch的回调只在响应式数据发生变化时才执行，而在Vue中可以通过选项参数immediate来指定回调是否需要立即执行。

## 添加imediate选项控制立即执行

~~~JavaScript
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    newValue = effectFn()
    cb(newValue, oldValue)
    oldValue = newValue
  }

  const effectFn = effect(
    // 执行 getter
    () => getter(),
    {
      lazy: true,
      // 使用 job 函数作为调度器函数
      scheduler: job
    }
  )
  if (options.immediate) {
    // 当 immediate 为 true 时立即执行 job，从而触发回调执行
    job()
  } else {
    oldValue = effectFn()
  }
}
~~~

## 使用微任务模拟异步执行

添加flush选项，当flush为post时使用Promise.resolve()将job函数放到为任务队列，从而实现异步延迟执行。

~~~JavaScript
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  const job = () => {
    newValue = effectFn()
    cb(newValue, oldValue)
    oldValue = newValue
  }

  const effectFn = effect(
    // 执行 getter
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        // 在调度函数中判断 flush 是否为 'post'，如果是，将其放到微任务队列中执行
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}
~~~

## 完整代码
> [计算属性](https://code.juejin.cn/pen/7320080810831249419)

# 过期的副作用

注册过期函调,当第二次触发watch时第一次的expired会通过闭包被更改为true

~~~JavaScript
watch(obj, async (newValue, oldValue, onInvalidate) => {
  // 定义一个标志，代表当前副作用函数是否过期，默认为 false，代表没有过期
  let expired = false
  // 调用 onInvalidate() 函数注册一个过期回调
  onInvalidate(() => {
    // 当过期时，将 expired 设置为 true
    expired = true
  })
  // 发送网络请求
  const res = await fetch('/path/to/request')

  // 只有当该副作用函数的执行没有过期时，才会执行后续操作。
  if (!expired) {
    finalData = res
  }
})
~~~


~~~JavaScript
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  // cleanup 用来存储用户注册的过期回调
  let cleanup
  // 定义 onInvalidate 函数
  function onInvalidate(fn) {
    // 将过期回调存储到 cleanup 中
    cleanup = fn
  }

  const job = () => {
    newValue = effectFn()
    // 在调用回调函数 cb 之前，先调用过期回调
    if (cleanup) {
      cleanup()
    }
    // 将 onInvalidate 作为回调函数的第三个参数，以便用户使用
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
  }

  const effectFn = effect(
    // 执行 getter
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}
~~~

## 完整代码
> [过期的副作用](https://code.juejin.cn/pen/7320168567016521738)