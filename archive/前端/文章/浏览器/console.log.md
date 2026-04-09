---
theme: z-blue
highlight: a11y-light
---
# 前言

今天在公司找bug卡了一天，解决bug后想着如果没有console.log的不正确显示问题的话应该能省不少时间！

# 不同步显示bug

在我们日常开发中少不了用console.log打印变量解决bug，但是如果console.log输出的是对象就有可能发生显示异常问题，如下:
1. 首先我们定义了一个还有姓名和年龄的对象
2. 后输出obj
3. 再重新修改姓名
<p align=center><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2bdbe2ff1b24f6f93c29f46cf6b7038~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=313&h=222&s=8172&e=png&b=ffffff" alt="Pasted image 20230918210507.png"  /></p>
可以看到，在未展开时name依然是Bob。但是展开后。。。

<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1065dc40da047bc8850809dc60574f8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=297&h=106&s=6176&e=png&b=ffffff" alt="Pasted image 20230918211715.png"  /></p>
name从Bob变成了Jenny。


# 原因

 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/console/log)里有介绍，在console.log输出的其中每个对象会以字符串的形式按照顺序依次输出到控制台。请注意，如果你在最新版本的 Chrome 和 Firefox 中输出对象，你在控制台中得到的是`对该对象的引用`，这不一定是你调用 `console.log()` 时该对象的“值”，但它一定是该对象在你打开控制台时的值。

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf64c46ee394482aac79de3a7a1a1a4d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=314&h=286&s=9496&e=png&b=ffffff" alt="1695044072365.png"  /></p>
 我们刚开始看到的name:Bob是该对象的一个快照，当点开扩展后浏览器会`按引用查找值`，此时引用中的name值已经改变为  name:Jenny 自然就产生了这种数值不准确的现象。
 
# 解决方法

## JSON.stringfy

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12bcfd53ea56446095ed424b20edd7b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=481&h=288&s=14171&e=png&b=ffffff" alt="Pasted image 20230918214649.png"  /></p>
通过使用 JSON.stringify 与 JSON.parse 将对象进行序列化。
 
### 缺点

正如我们常背的面试题一样，JSON的深拷贝对`复杂类型`如function拷贝时会丢失!
嗯~ o(*￣▽￣*)o，一般也不会有什么复杂类型吧。
<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4547c382b68492aa7698dc5c01ccc15~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=489&h=378&s=17783&e=png&b=ffffff" alt="Pasted image 20230919210506.png"  /></p>

## 使用debugger

个人感觉React DevTools、Redux DevTools并不好用，前者调用层级太深经常没法找到正确的组件以及数据，后者是数据量大的时候会直接罢工。故遇到`异步数据变动多`时 用debugger还是最优解。

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/272cf64e362d43daa32cdabac77ecd17~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2560&h=1390&s=246963&e=png&b=fefdfd" alt="Pasted image 20230923204658.png"  /></p>
可以看到我们在代码中2处添加了debugger标记，打开开发者工具，当if内语句时触发（也就是在1处hover为true时）时程序就会停止，此时就可以在3处看到我们写的score变量啦。

### 缺点

数据量大时会有卡顿~

# 总结

直接使用console.log在打印引用类型数据时有概率不准确，建议使用

- console.log(JSON.parse(JSON.stringify(data)))
- console.log直接替换为debugger打断点调试。
