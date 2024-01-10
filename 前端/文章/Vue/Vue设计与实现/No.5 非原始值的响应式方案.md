---
theme: z-blue
highlight: docco
---
# 前言

# 理解Proxy和Reflect

## Proxy

### 什么是Proxy

使用Proxy可以创建一个代理对象。它能够实现对**其他对象**的代理。

### 什么是代理

代理指的是对一个对象基本语义的代理。它允许我们拦截并重新定义对一个对象的基本操作。

### 什么是基本语义

对于对象属性的读取、设置属性值的操作就属于基本语义的操作。如get、set、apply...

proxy只能代理但基本语义的基本操作，不能复合多基本语义的复合操作。

## Reflect

proxy拦截器的所有方法在Reflect中都有同名函数。Reflect的作用是提供了昂问一个对象属性的默认行为。

如直接读取obj.foo我们可以使用 obj.foo也可以使用Reflect.get(obj,'foo')

### 使用Reflect的意义

Reflect的函数可以接收第三个参数，即指定接收者receiver。

使用effect对[访问器属性](https://www.zhihu.com/question/40648241)进行依赖收集

~~~JavaScript
const obj = {
    foo: 1,
    get bar() {
        return this.foo
    }
}
~~~

实际上在get收集依赖时收集的不是obj.foo而是data.foo(this.foo)，使用Reflect可以接受receiver指定this为代理对象。

> [什么是访问器属性](https://www.zhihu.com/question/40648241)

**本节完整示例**
> [计算属性](https://code.juejin.cn/pen/7320168567016521738)

~~~JavaScript
const p = new Proxy(obj, {
  // 拦截读取操作，接收第三个参数 receiver
  get(target, key, receiver) {
    track(target, key)
    // 使用 Reflect.get 返回读取到的属性值
    return Reflect.get(target, key, receiver)
  },
  // 省略部分代码
})
~~~    

# JavaScript对象Proxy的工作原理

根据 ECMAScript 规范，在 JavaScript 中有两种对象，其中一种叫作**常规对象**（ordinary object），另一种叫作**异质对象**（exotic object）。

## 如何区分是普通对象还是函数

对象的实际语义是由对象的内部方法指定的。所谓内部方法，指的是当我们对一个对象进行操作时在引擎内部调用的方法，这些方法对于JavaScript使用者来说是不可见的。

通过内部方法和内部槽来区分对象和函数。如果是函数会有额外的必要内部方法Call和Construct。

![[Pasted image 20240107175558.png]]

## 如何区分是常规对象还是异质对象

满足以下三点要求的对象就是常规对象：
- 对于下表列出的内部方法，必须使用 ECMA 规范 10.1.x 节给出的定义实现；
![[Pasted image 20240107175849.png]]
- 对于内部方法 [[Call]]，必须使用 ECMA 规范 10.2.1 节给出的定义实现；
- 对于内部方法 [[Construct]]，必须使用 ECMA 规范 10.2.2 节给出的定义实现。

Proxy就是一个异质对象，它的[[Get]]没有使用ECMA规范的10.1.8节给出的定义实现。

创建代理对象时指定的拦截函数，实际上是用来自定义代理对象本身的内部方法和行为的，而不是用来指定被代理对象的内部方法和行为的。

# 如何代理Object

代理Object涉及了多个方面，以下内容围绕经典的增删改查进行展开完善。

## 完善get操作

在增、查时都涉及了读取操作，响应系统中，有以下三种读取操作。

- 访问属性：obj.foo。
- 判断对象或原型上是否存在给定的key：key in obj。
- 使用for...in循环遍历对象：for(const key in obj){}。

通过查阅ECMA-262规范[13.10.1](https://262.ecma-international.org/14.0/?_gl=1*nwkpjf*_ga*MTAzMDI0MDQ4NC4xNzA0NjMwNjM2*_ga_TDCK4DWEPP*MTcwNDYzMDYzNS4xLjAuMTcwNDYzMDYzNS4wLjAuMA..&_ga=2.226073754.1633835410.1704630637-1030240484.1704630636#sec-relational-operators-runtime-semantics-evaluation)可以找到in操作符最终是调用hasProperty实现的，而在Proxy中hasProperty方法是通过has函数实现的，所以可以通过has拦截函数实现对in操作符的代理。
![[Pasted image 20240107203419.png]]

## 完善delete操作

在删时设计了delete操作，根据ECMA262规范可以找到山操作需要通过deleteProperty函数。

# 合理的触发响应

我们在上一节已经构建了大体的框架，现在继续接下来的工作。

## 当新旧值相同时

修改set拦截函数，在调用trigger函数之前判断新旧值是否相同。仅仅判断全等并不够，因为在JS中 NaN不等于NaN，还得判断是不是NaN

~~~JavaScript
// 在书中是通过全等来判断是否相等的。而在Vue源码中是通过Object.is来判断是否相等的。
if(oldVal !== newVal && (oldVal === oldVal ||newVal === newVal)){
    trigger(target,key,type)
}
// 显然使用Object.is更优雅
if(Ojbect.is(newVal,oldVal)){
    // ...
}
~~~

## 原型上继承属性

~~~JavaScript
const obj = {}
const proto = { bar: 1 }
const child = reactive(obj)
const parent = reactive(proto)
// 使用 parent 作为 child 的原型
Object.setPrototypeOf(child, parent)

effect(() => {
  console.log(child.bar) // 1
})
// 修改 child.bar 的值
child.bar = 2 // 会导致副作用函数重新执行
~~~