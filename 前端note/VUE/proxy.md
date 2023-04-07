# 相较于defineProperty的变化
相较于Vue2中使用的`Object.defineProperty`来实现响应式数据，Vue3采用了ES6中的`Proxy`来实现响应式数据，主要变化有以下几点：
1. `Proxy`可以监听到更多的变化：`Object.defineProperty`只能劫持对象的属性，而`Proxy`可以劫持整个对象，包括新增属性和删除属性。
2. `Proxy`的性能更高：`Proxy`可以直接监听到整个对象，而`Object.defineProperty`需要遍历对象的属性，逐一进行劫持，性能相对较低。
3. `Proxy`不需要深度遍历对象：当我们使用`Object.defineProperty`对一个对象进行劫持时，如果这个对象是一个嵌套的对象，我们还需要递归地对其内部的对象进行遍历，才能让整个对象成为响应式的。而使用`Proxy`则不需要这样做，它可以直接对整个对象进行劫持。
4. `Proxy`可以监听数组变化：`Proxy`可以监听数组的变化，而`Object.defineProperty`无法直接监听数组的变化，需要通过`push`、`pop`、`unshift`、`splice`等方法来监听数组的变化。
