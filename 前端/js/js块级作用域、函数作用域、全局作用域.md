## 1.前言

> 作用域是任何一门编程语言中的重中之重，因为它控制着变量与参数的可见性与生命周期。很惭愧，我今天才深入理解JS的作用域..我不配做一个程序员.. 开玩笑，什么时候理解都不晚，重要的是理解了以后能不能深深地扎在记忆里，不能，那就写下来

## 2.块级作用域

> 在一个代码块（括在一对花括号中的一组语句）中定义的所有变量在代码块的外部是不可见的。
>
> 我的理解是块级作用域是比函数作用域更严格的作用域

ES6中新增的概念，在ES5中是没有的，ES5中没有？ 没有的时候我们代码也写的好好的，现在新增的概念，我不用不行吗？ 来，拋一个典型的问题出来，你就明白块级作用域出现的重要性了。

```arcade
var i = 100;                //全局变量
for(var i = 0;i < 5; i++){}
console.log("i =",i);       //i = 5
```

我们用i变量只想在for循环中使用，并没有想要修改全局变量的意思。你可能会说谁会用i做全局变量啊，那个全局变量i只是为了突出这个例子，**修改全局变量事小，泄露成全局变量才是我们担心的。**
怎么办？在ES5时代，还没有块级作用域这个概念，但是当时也有一种解决方法，那就是..
..
..
..
..
对，闭包，用后即焚：

```arcade
var i = 100;                //全局变量
(function(){
    for(var i = 0;i < 5; i++){}
})()
console.log("i =",i);       //i = 100
```

ES6中为什么会出现块级作用域的概念，那还要问`let`和`const`两兄弟。

## 3.let 很皮

![图片描述](js块级作用域、函数作用域、全局作用域.assets/bVbemO7.png)
使用let和const以后会发现，他们声明的变量作用域范围不会超过`{}`这个圈

```arcade
for(let i = 0; i < 5; i++){};
console.log("i =",i);      //i is not defined
```

**let 对比之前 var 声明的变量总结有以下几点不同：**

- 1.let 只在声明的代码块内有效。上面已经验证

```arcade
{
    let a = 1;
}
console.log(a);           //Uncaught ReferenceError: a is not defined

{
    var a = 1;
}
console.log(a);           //1
```

- 2.let 不允许同一个作用域重复声明变量（先var 后 let 或 先 let 后 var 都不可行）；var 后声明的会替换之前的。

```abnf
let a = 1;
let a = 2;                //Uncaught SyntaxError: Identifier 'a' has already been declared

var a = 1;
var a = 2;                // a = 2
```

- 3.let 存在**暂时性死区**(瞎jb拽词，个人理解之前var声明的变量至少是undefined，现在用let的话直接拋错)。

  此处例子很清晰的解释了暂时性死区

```arcade
// 大括号中a使let声明，所以只能在声明后使用（不存在声明提前，a = undefined的情况）
var a = 10;
{
    console.log(a);   //Uncaught ReferenceError: a is not defined
    let a = 2;		  //出现暂时性死区
    console.log(a);   //2
}

// 大括号中a使var声明
var a = 10;
{
    console.log(a);   //undefined
    var a = 2;
    console.log(a);   //2
}
```

- 4.全局变量的属性

```javascript
window.a = 1;
var a = 2 ;
console.log(a);         // 2
console.log(window.a);  // 2

window.b = 1;
let b = 2 ;
console.log(b);         // 2
console.log(window.b);  // 1
```

## 4.活用const

const 声明的对象，是可以修改内部属性的，数组同理；

## 5.总结

主要总结一下块级作用域、以及块级作用域出现的意义，方便更好的记住。
let 和 const 产生一定有它的意义，ES6其他的新特性也一样。
其他特性会在接下来总结。

> 引用自[全局作用域、函数作用域、块级作用域的理解 - SegmentFault 思否](https://segmentfault.com/a/1190000015779676)