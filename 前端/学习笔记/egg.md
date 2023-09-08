# 目录结构
- `app/router.js` 用于配置 URL 路由规则，具体参见 [Router](https://www.eggjs.org/zh-CN/basics/router)。
- `app/controller/**` 用于解析用户的输入，处理后返回相应的结果，具体参见 [Controller](https://www.eggjs.org/zh-CN/basics/controller)。
- `app/service/**` 用于编写业务逻辑层，可选，建议使用，具体参见 [Service](https://www.eggjs.org/zh-CN/basics/service)。
- `app/middleware/**` 用于编写中间件，可选，具体参见 [Middleware](https://www.eggjs.org/zh-CN/basics/middleware)。
- `app/public/**` 用于放置静态资源，可选，具体参见内置插件 [egg-static](https://github.com/eggjs/egg-static)。
- `app/extend/**` 用于框架的扩展，可选，具体参见[框架扩展](https://www.eggjs.org/zh-CN/basics/extend)。
- `config/config.{env}.js` 用于编写配置文件，具体参见[配置](https://www.eggjs.org/zh-CN/basics/config)。
- `config/plugin.js` 用于配置需要加载的插件，具体参见[插件](https://www.eggjs.org/zh-CN/basics/plugin)。
- `test/**` 用于单元测试，具体参见[单元测试](https://www.eggjs.org/zh-CN/core/unittest)。
- `app.js` 和 `agent.js` 用于自定义启动时的初始化工作，可选，具体参见[启动自定义](https://www.eggjs.org/zh-CN/basics/app-start)。关于`agent.js`的作用参见[Agent 机制](https://www.eggjs.org/zh-CN/core/cluster-and-ipc#agent-%E6%9C%BA%E5%88%B6)。

# 框架内置基础对象
## Application
Application 是全局应用对象。在一个应用中，每个进程只会实例化一个 Application 实例。它继承自 [Koa.Application](http://koajs.com/#application)，在它上面我们可以挂载一些全局的方法和对象。我们可以轻松的在插件或者应用中[扩展 Application 对象](https://www.eggjs.org/zh-CN/basics/extend#Application)。
### 事件
在框架运行时，会在 Application 实例上触发一些事件，应用开发者或者插件开发者可以监听这些事件做一些操作。作为应用开发者，我们一般会在[启动自定义脚本](https://www.eggjs.org/zh-CN/basics/app-start)中进行监听。

- `server`: 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者。
- `error`: 运行时有任何的异常被 onerror 插件捕获后，都会触发 `error` 事件，将错误对象和关联的上下文（如果有）暴露给开发者，可以进行自定义的日志记录上报等处理。
- `request` 和 `response`: 应用收到请求和响应请求时，分别会触发 `request` 和 `response` 事件，并将当前请求上下文暴露出来，开发者可以监听这两个事件来进行日志记录。

获取方式
Application 对象几乎可以在编写应用时的任何一个地方获取到，下面介绍几个经常用到的获取方式：

几乎所有被框架 [Loader](https://www.eggjs.org/zh-CN/advanced/loader) 加载的文件（Controller，Service，Schedule 等），都可以 export 一个函数，这个函数会被 Loader 调用，并使用 app 作为参数

## Context
Context 是一个**请求级别的对象**，继承自 [Koa.Context](http://koajs.com/#context)。在每一次收到用户请求时，框架会实例化一个 Context 对象，这个对象封装了这次用户请求的信息，并提供了许多便捷的方法来获取请求参数或者设置响应信息。框架会将所有的 [Service](https://www.eggjs.org/zh-CN/basics/service) 挂载到 Context 实例上，一些插件也会将一些其他的方法和对象挂载到它上面

### 获取方式
最常见的 Context 实例获取方式是在 [Middleware](https://www.eggjs.org/zh-CN/basics/middleware), [Controller](https://www.eggjs.org/zh-CN/basics/controller) 以及 [Service](https://www.eggjs.org/zh-CN/basics/service) 中。Controller 中的获取方式在上面的例子中已经展示过了，在 Service 中获取和 Controller 中获取的方式一样，在 Middleware 中获取 Context 实例则和 [Koa](http://koajs.com/) 框架在中间件中获取 Context 对象的方式一致。

## Request & Response

Request 是一个**请求级别的对象**，继承自 [Koa.Request](http://koajs.com/#request)。封装了 Node.js 原生的 HTTP Request 对象，提供了一系列辅助方法获取 HTTP 请求常用参数。

Response 是一个**请求级别的对象**，继承自 [Koa.Response](http://koajs.com/#response)。封装了 Node.js 原生的 HTTP Response 对象，提供了一系列辅助方法设置 HTTP 响应。
### 获取方式

可以在 Context 的实例上获取到当前请求的 Request(`ctx.request`) 和 Response(`ctx.response`) 实例。

## Controller

框架提供了一个 Controller 基类，并推荐所有的 [Controller](https://www.eggjs.org/zh-CN/basics/controller) 都继承于该基类实现。这个 Controller 基类有下列属性：

- `ctx` - 当前请求的 [Context](https://www.eggjs.org/zh-CN/basics/objects#context) 实例。
- `app` - 应用的 [Application](https://www.eggjs.org/zh-CN/basics/objects#application) 实例。
- `config` - 应用的[配置](https://www.eggjs.org/zh-CN/basics/config)。
- `service` - 应用所有的 [service](https://www.eggjs.org/zh-CN/basics/service)。
- `logger` - 为当前 controller 封装的 logger 对象。

- 控制器负责处理客户端请求和响应，它接收来自路由的请求，并根据请求的内容调用适当的Service方法来执行业务逻辑。
- 控制器通常包含多个动作（Action），每个动作对应一个不同的HTTP请求路径和方法（GET、POST等）。
- 控制器负责验证和处理请求参数，然后将结果返回给客户端。

## Service
- 服务是用于处理业务逻辑的组件。它们包含了应用程序的核心功能。例如数据库操作、数据处理、计算等。
- 服务被控制器调用，以执行特定的业务操作。这有助于保持控制器的简洁性，将业务逻辑与控制器分离开来。
- 服务通常包括多个方法，每个方法负责不同的业务操作，例如创建、读取、更新和删除数据等。