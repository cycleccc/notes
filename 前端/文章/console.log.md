# 前言
今天在公司找bug卡了一天，解决bug后想着如果没有console.log的不正确显示问题的话最起码能省一半时间吧！

# 不同步显示bug
在我们日常开发中少不了用console.log打印变量解决bug，但是如果console.log输出的是对象就有可能发生显示异常问题，如下:
1. 首先我们定义了一个还有姓名和年龄的对象
2. 后输出obj
3. 再重新修改姓名
![[Pasted image 20230918210507.png]]
可以看到，在未展开时name依然是Bob。但是展开后。。。
![[Pasted image 20230918211715.png]]
name从Bob变成了Jenny。

# 原因
 [MDN]里有介绍，在console.log输出的其中每个对象会以字符串的形式按照顺序依次输出到控制台。请注意，如果你在最新版本的 Chrome 和 Firefox 中输出对象，你在控制台中得到的是`对该对象的引用`，这不一定是你调用 `console.log()` 时该对象的“值”，但它一定是该对象在你打开控制台时的值。
![[1695044072365.png]]
 我们刚开始看到的name:Bob是该对象的一个快照，当点开扩展后浏览器会`按引用查找值`，此时引用中的name值已经改变为  name:Jenny 自然就产生了这种数值不准确的现象。
 
 # 解决方法
## JSON.stringfy
 ![[Pasted image 20230918214649.png]]
 通过使用 JSON.stringify 与 JSON.parse 将对象进行序列化。
 
### 缺点
正如我们常备的面试题一样，JSON的深拷贝对`复杂类型`如function拷贝时会丢失!
嗯~ o(*￣▽￣*)o，一般也不会有什么复杂类型吧。
![[Pasted image 20230919210506.png]]
## 使用debugger
个人感觉React DevTools、Redux DevTools并不好用，前者调用层级太深经常没法找到正确的组件以及数据，后者是数据量大的时候会直接罢工。故遇到`异步数据变动多`时 用debugger还是最优解。
![[Pasted image 20230923204308.png]]