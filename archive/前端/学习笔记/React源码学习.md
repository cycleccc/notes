# 理念篇
## 第一章 React理念
## react理念
	React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。·
## CUP瓶颈
**浏览器刷新机制**
主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行**样式布局**和**样式绘制**了。

**时间切片**
当预留的时间不够用时，`React`将线程控制权交还给浏览器使其有时间渲染UI，`React`则等待下一帧时间到来继续被中断的工作。

> 这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为`时间切片`（time slice）

## IO瓶颈
试想如果我们一点击“Siri与搜索”就显示`loading`效果，即使数据请求时间很短，`loading`效果一闪而过。用户也是可以感知到的。

为此，`React`实现了[Suspense](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)功能及配套的`hook`——[useDeferredValue](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)。

而在源码内部，为了支持这些特性，同样需要将**同步的更新**变为**可中断的异步更新**。

## 老的React架构
### React15架构
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

#### Reconciler（协调器）
在`React`中可以通过`this.setState`、`this.forceUpdate`、`ReactDOM.render`等API触发更新。

**做了什么**
每当有更新发生时，**Reconciler**会做如下工作：

- 调用函数组件、或class组件的`render`方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比找出本次更新中变化的虚拟DOM
- 通知**Renderer**将变化的虚拟DOM渲染到页面上
#### Renderer（渲染器）
由于`React`支持跨平台，所以不同平台有不同的**Renderer**。我们前端最熟悉的是负责在浏览器环境渲染的**Renderer** —— [ReactDOM](https://www.npmjs.com/package/react-dom)

除此之外，还有：

- [ReactNative](https://www.npmjs.com/package/react-native)渲染器，渲染App原生组件
- [ReactTest](https://www.npmjs.com/package/react-test-renderer)渲染器，渲染出纯Js对象用于测试
- [ReactArt](https://www.npmjs.com/package/react-art)渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，**Renderer**接到**Reconciler**通知，将变化的组件渲染在当前宿主环境。

### React15架构的缺点
在**Reconciler**中，`mount`的组件会调用[mountComponent](https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L498)，`update`的组件会调用[updateComponent](https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L877)。这两个方法都会递归更新子组件。
#### 递归更新的缺点
由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

## React16架构
- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

#### Scheduler（调度器）
**`window.requestIdleCallback()`** 方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间`timeout`，则有可能为了在超时前执行函数而打乱执行顺序。

由于以下因素，`React`放弃使用：

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的`requestIdleCallback`触发的频率会变得很低

`React`实现了功能更完备的`requestIdleCallback`polyfill，这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。

#### Reconciler（协调器）
React16更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

**React16解决中断更新时DOM渲染不完全的问题呢**
在React16中，**Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表增/删/更新的标记，类似这样：

```JavaScript
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

#### Renderer（渲染器）

**Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。

## Fiber架构的心智模型
#### 什么是代数响应
	`代数效应`是`函数式编程`中的一个概念，用于将`副作用`从`函数`调用中分离。

`代数效应`能够将`副作用`从函数逻辑中分离，使函数关注点保持纯粹。

#### 代数效应与Generator

从`React15`到`React16`，协调器（`Reconciler`）重构的一大目的是：将老的`同步更新`的架构变为`异步可中断更新`。

`异步可中断更新`可以理解为：`更新`在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

这就是`代数效应`中`try...handle`的作用。

其实，浏览器原生就支持类似的实现，这就是`Generator`。

但是`Generator`的一些缺陷使`React`团队放弃了他：

- 类似`async`，`Generator`也是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变。这样心智负担比较重。
    
- `Generator`执行的`中间状态`是上下文关联的。

#### 代数效应与Fiber

`Fiber`并不是计算机术语中的新名词，他的中文翻译叫做`纤程`，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将`纤程`理解为`协程`的一种实现。在`JS`中，`协程`的实现便是`Generator`。

所以，我们可以将`纤程`(Fiber)、`协程`(Generator)理解为`代数效应`思想在`JS`中的体现。

`React Fiber`可以理解为：

`React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

其中每个任务更新单元为`React Element`对应的`Fiber节点`。

## Fiber架构的实现原理
#### Fiber的起源
在`React15`及以前，`Reconciler`采用递归的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，`React16`将**递归的无法中断的更新**重构为**异步的可中断更新**，由于曾经用于递归的**虚拟DOM**数据结构已经无法满足需要。于是，全新的`Fiber`架构应运而生。

#### Fiber的三层含义
1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
2. 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）

#### Fiber的结构
从上述三层含义来解析Fiber的属性
1. 有作为静态数据结构的属性
```JavaScript
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;
```
2. 有用于连接其它Fiber节点形成Fiber树的属性
```JavaScript
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;
```
3. 作为动态的工作单元的属性
```JavaScript
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;
```
4. 调度优先级相关
```
  this.lanes = NoLanes;
  this.childLanes = NoLanes;
```

## Fiber架构的工作原理
#### 什么是双缓存
**在内存中构建并直接替换**的技术叫做[双缓存 (opens new window)](https://baike.baidu.com/item/%E5%8F%8C%E7%BC%93%E5%86%B2)。

`React`使用“双缓存”来完成`Fiber树`的构建与替换——对应着`DOM树`的创建与更新。

#### 双缓存Fiber树
在`React`中最多会同时存在两棵`Fiber树`。当前屏幕上显示内容对应的`Fiber树`称为`current Fiber树`，正在内存中构建的`Fiber树`称为`workInProgress Fiber树`。

`current Fiber树`中的`Fiber节点`被称为`current fiber`，`workInProgress Fiber树`中的`Fiber节点`被称为`workInProgress fiber`，他们通过`alternate`属性连接。

`React`应用的根节点通过使`current`指针在不同`Fiber树`的`rootFiber`间切换来完成`current Fiber`树指向的切换。

即当`workInProgress Fiber树`构建完成交给`Renderer`渲染在页面上后，应用根节点的`current`指针指向`workInProgress Fiber树`，此时`workInProgress Fiber树`就变为`current Fiber树`。

每次状态更新都会产生新的`workInProgress Fiber树`，通过`current`与`workInProgress`的替换，完成`DOM`更新。

# 第二章 前置

## 源码的文件结构

### 顶层目录
除去配置文件和隐藏文件夹，根目录的文件夹包括三个：

|目录|具体内容|
|---|---|
|fixtures/*|测试用例(示例)|
|packages/*|React尚未编译的核心源码|
|scripts/*|各种工具链的脚本|

## 调试源码
### 拉取源码


## 深入理解JSX
### JSX简介
JSX（JavaScript XML）是一种JavaScript的扩展语法，用于在React中描述UI组件的结构。它允许您在JavaScript代码中编写类似HTML的标记，以更容易地创建React元素。

### React.createElement
`React.createElement`最终会调用`ReactElement`方法返回一个包含组件数据的对象，该对象有个参数`$$typeof: REACT_ELEMENT_TYPE`标记了该对象是个`React Element`。

### JSX与Fiber节点
`JSX`是一种描述当前组件内容的数据结构，他不包含组件**schedule**、**reconcile**、**render**所需的相关信息。

在组件`mount`时，`Reconciler`根据`JSX`描述的组件内容生成组件对应的`Fiber节点`。

在`update`时，`Reconciler`将`JSX`与`Fiber节点`保存的数据对比，生成组件对应的`Fiber节点`，并根据对比结果为`Fiber节点`打上`标记`。

# 第三章 render阶段
## 流程概览
### “递”阶段
首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个`Fiber节点`调用[beginWork方法 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058)。
该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个`Fiber节点`连接起来。
当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

### “归”阶段
首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个`Fiber节点`调用[beginWork方法 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058)。
该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个`Fiber节点`连接起来。
当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。
“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render阶段`的工作就结束了。

## beginWork
### 方法概览
`beginWork`的工作可以分为两部分：

- `update`时：如果`current`存在，在满足一定条件时可以复用`current`节点，这样就能克隆`current.child`作为`workInProgress.child`，而不需要新建`workInProgress.child`。
- `mount`时：除`fiberRootNode`以外，`current === null`。会根据`fiber.tag`不同，创建不同类型的`子Fiber节点`

## completeWork












# 第五章 Diff算法

一个`DOM节点`在某一时刻最多会有4个节点和他相关。

1. `current Fiber`。如果该`DOM节点`已在页面中，`current Fiber`代表该`DOM节点`对应的`Fiber节点`。
2. `workInProgress Fiber`。如果该`DOM节点`将在本次更新中渲染到页面中，`workInProgress Fiber`代表该`DOM节点`对应的`Fiber节点`。
3. `DOM节点`本身。
4. `JSX对象`。即`ClassComponent`的`render`方法的返回结果，或`FunctionComponent`的调用结果。`JSX对象`中包含描述`DOM节点`的信息。

`Diff算法`的本质是对比1和4，生成2。

## Diff的瓶颈以及React如何应对

为了降低算法复杂度，`React`的`diff`会预设三个限制：

1. 只对同级元素进行`Diff`。如果一个`DOM节点`在前后两次更新中跨越了层级，那么`React`不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过 `key prop`来暗示哪些子元素在不同的渲染下能保持稳定。

## Diff如何实现

从`Diff`的入口函数`reconcileChildFibers`出发，该函数会根据`newChild`（即`JSX对象`）类型调用不同的处理函数。

可以从同级的节点数量将Diff分为两类：

1. 当`newChild`类型为`object`、`number`、`string`，代表同级只有一个节点
2. 当`newChild`类型为`Array`，同级有多个节点

## 单节点Diff

React通过先判断`key`是否相同，如果`key`相同则判断`type`是否相同，只有都相同时一个`DOM节点`才能复用。

- 当`child !== null`且`key相同`且`type不同`时执行`deleteRemainingChildren`将`child`及其兄弟`fiber`都标记删除。
    
- 当`child !== null`且`key不同`时仅将`child`标记删除。

## 多节点Diff
`React团队`发现，在日常开发中，相较于`新增`和`删除`，`更新`组件发生的频率更高。所以`Diff`会优先判断当前节点是否属于`更新`。

>在我们做数组相关的算法题时，经常使用**双指针**从数组头和尾同时遍历以提高效率，但是这里却不行。
>虽然本次更新的`JSX对象` `newChildren`为数组形式，但是和`newChildren`中每个组件进行比较的是`current fiber`，同级的`Fiber节点`是由`sibling`指针链接形成的单链表，即不支持双指针遍历。
>即 `newChildren[0]`与`fiber`比较，`newChildren[1]`与`fiber.sibling`比较。
>所以无法使用**双指针**优化。
## 第一轮遍历

基于以上原因，`Diff算法`的整体逻辑会经历两轮遍历：

第一轮遍历：处理`更新`的节点。

第一轮遍历步骤如下：

1. `let i = 0`，遍历`newChildren`，将`newChildren[i]`与`oldFiber`比较，判断`DOM节点`是否可复用。
    
2. 如果可复用，`i++`，继续比较`newChildren[i]`与`oldFiber.sibling`，可以复用则继续遍历。
    
3. 如果不可复用，分两种情况：
    

- `key`不同导致不可复用，立即跳出整个遍历，**第一轮遍历结束。**
    
- `key`相同`type`不同导致不可复用，会将`oldFiber`标记为`DELETION`，并继续遍历
    

4. 如果`newChildren`遍历完（即`i === newChildren.length - 1`）或者`oldFiber`遍历完（即`oldFiber.sibling === null`），跳出遍历，**第一轮遍历结束。**

## 第二轮更新
对于第一轮遍历的结果，我们分别讨论：

### [#](https://react.iamkasong.com/diff/multi.html#newchildren%E4%B8%8Eoldfiber%E5%90%8C%E6%97%B6%E9%81%8D%E5%8E%86%E5%AE%8C)`newChildren`与`oldFiber`同时遍历完

那就是最理想的情况：只需在第一轮遍历进行组件[`更新` (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L825)。此时`Diff`结束。

### [#](https://react.iamkasong.com/diff/multi.html#newchildren%E6%B2%A1%E9%81%8D%E5%8E%86%E5%AE%8C-oldfiber%E9%81%8D%E5%8E%86%E5%AE%8C)`newChildren`没遍历完，`oldFiber`遍历完

已有的`DOM节点`都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的`newChildren`为生成的`workInProgress fiber`依次标记`Placement`。

既然我们的目标是寻找移动的节点，那么我们需要明确：节点是否移动是以什么为参照物？

我们的参照物是：最后一个可复用的节点在`oldFiber`中的位置索引（用变量`lastPlacedIndex`表示）。

由于本次更新中节点是按`newChildren`的顺序排列。在遍历`newChildren`过程中，每个`遍历到的可复用节点`一定是当前遍历到的`所有可复用节点`中**最靠右的那个**，即一定在`lastPlacedIndex`对应的`可复用的节点`在本次更新中位置的后面。

那么我们只需要比较`遍历到的可复用节点`在上次更新时是否也在`lastPlacedIndex`对应的`oldFiber`后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量`oldIndex`表示`遍历到的可复用节点`在`oldFiber`中的位置索引。如果`oldIndex < lastPlacedIndex`，代表本次更新该节点需要向右移动。

`lastPlacedIndex`初始为`0`，每遍历一个可复用的节点，如果`oldIndex >= lastPlacedIndex`，则`lastPlacedIndex = oldIndex`。

#  第六章 状态更新












# 生词
- from scratch：从头开始
- nonessential：非本质的；非必须的
- Concurrent：并发的
- Reconciliation：调和；和好
- concept：概念
- vanilla：香草味的；普通的；寻常的
- sibling：兄弟；兄弟姐妹；同胞
- Reconciliation：调和；和好；对帐
- alternate：交替的；轮流的