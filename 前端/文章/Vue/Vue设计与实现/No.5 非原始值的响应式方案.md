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

当使用effect对访问属性进行依赖收集
~~~JavaScript
~~~

(什么是访问器属性)[https://www.zhihu.com/question/40648241]
# JavaScript对象Proxy的工作原理

