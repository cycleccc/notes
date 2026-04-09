---
theme: z-blue
---
---
theme: z-blue
highlight: docco
---

## 前言
这篇文章带你了解这么多种组件通信方式为什么要使用这种而不使用另一种！
## 父子组件通信
### props\$emits
`props$emits`：那必须是我了！

这是最常用最经典的通信方式，父组件通过 props 向子组件传递数据，子组件通过 $emit 触发事件向父组件传递数据。

**父组件向子组件传递数据props实现**

```JavaScript
// 父组件
<template>
  <div>
    <child :message="message"></child>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  data () {
    return {
      message: 'Hello World'
    }
  }
}
</script>

// 子组件
<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>
```

**子组件向父组件传递数据emits实现**

```JavaScript
// 子组件
<template>
  <div>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('my-event', 'Hello World')
    }
  }
}
</script>

// 父组件
<template>
  <div>
    <child @my-event="handleEvent"></child>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  methods: {
    handleEvent (message) {
      console.log(message)
   }
  }
 }
</script>
```

### \$parent\$root和\$children

\$parent和\$children是Vue.js中的两个特殊属性，用于在组件之间进行通信。

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问。

`$parent`指向当前组件的父组件实例，可以通过它访问父组件的属性和方法。

`$children`指向当前组件的子组件实例数组，可以通过它访问子组件的属性和方法。

但是，官方文档中不推荐使用\$parent和\$children，因为它们会使组件之间的耦合度过高，不利于组件的复用和维护。如果需要在组件之间进行通信，可以使用props和\$emit等Vue.js提供的其他方式。

```JavaScript
// 父组件
Vue.component('parent-component', {
  template: `
    <div>
      <h2>Parent Component</h2>
      <child-component></child-component>
    </div>
  `,
  data() {
    return {
      message: 'Hello from parent component!'
    }
  }
})

// 子组件
Vue.component('child-component', {
  template: `
    <div>
      <h3>Child Component</h3>
      <p>{{ message }}</p>
    </div>
  `,
  data() {
    return {
      message: 'Hello from child component!'
    }
  },
  mounted() {
    console.log(this.$parent.message) // 输出：Hello from parent component!
  }
})
```
### ref

在Vue.js中，ref是一个用于给元素或子组件注册引用信息的特殊属性。当在模板或渲染函数中使用ref属性时，它会自动注册对应的元素或组件实例到父组件的 `$refs`对象中,ref直接操作DOM，这一点使得Vue不再是完全的MVVM框架。

下面是一个使用样例代码：

```JavaScript
<template>
  <div>
    <input type="text" ref="input">
    <button @click="handleClick">获取输入框的值</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log(this.$refs.input.value)
    }
  }
}
</script>
```

## 祖先后代通信

### provide/inject

跨级组件通信可以使用provide/inject来实现。具体来说，可以在祖宗组件中通过provide来提供变量，然后在子组件中通过inject来注入变量。这样子组件就可以访问祖宗组件中的变量了。

**跨级组件通信实现provide/inject实现**

```JavaScript
// parent.vue
export default {
  provide: {
    message: 'Hello World'
  }
}

// child.vue
export default {
  inject: ['message'],
  created () {
    console.log(this.message)
  }
}
```

### \$attrs/\$listeners

\$attrs和\$listeners是Vue.js中的两个特殊属性，它们可以用于在组件中传递属性和监听事件。

`$attrs`是一个对象，包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

`$listeners`是一个对象，包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
在组件中使用

示例代码如下：

```JavaScript
<template>
  <div>
    <child-component v-bind="$attrs" v-on="$listeners"></child-component>
  </div>
</template>


<script>
  import ChildComponent from './ChildComponent.vue'


  export default {
    components: {
      ChildComponent
    }
  }
</script>
```

## 全局组件通信

### Vuex 状态管理

Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex的核心概念包括state、getter、mutation、action和module。其中，state用于存储状态，getter用于获取状态，mutation用于修改状态，action用于提交mutation，module用于将store分割成模块。

**Store仓库实现**

```JavaScript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
})

export default store
```

**在Vue组件中使用Vuex**

```JavaScript
// App.vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="incrementAsync">Increment Async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapActions(['increment', 'incrementAsync'])
  }
}
</script>
```

### eventBus 发布订阅

用法与emits相似，但是需要注册和触发，相关知识点是手写发布订阅模式。Vuex和eventBus都可以实现复杂关系通信，但是复杂场景还是应该使用Vuex。

1. 在main.js中创建一个Event Bus实例

```JavaScript
// main.js
import Vue from 'vue'


export const EventBus = new Vue()
```

2.  在发送组件中触发事件

在发送组件中，使用Event Bus实例的$emit方法触发事件：

```JavaScript
// Sender.vue
import { EventBus } from './main.js'


export default {
  methods: {
    sendMessage() {
      EventBus.$emit('message', this.message)
    }
  }
}
```

3.  在接收组件中监听事件

在接收组件中，使用Event Bus实例的$on方法监听事件：

```JavaScript
// Receiver.vue
import { EventBus } from './main.js'


export default {
  data() {
    return {
      message: ''
    }
  },
  created() {
    EventBus.$on('message', message => {
      this.message = message
    })
  }
}
```

这样，当发送组件中触发'message'事件时，接收组件中的监听器就会被触发，从而更新接收组件的数据。
