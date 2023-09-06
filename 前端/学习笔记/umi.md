# 目录环境
## 根目录
- .umirc.ts
配置文件，包含 Umi 所有[非运行时配置](https://umijs.org/docs/api/config)（运行时配置一般定义于 [`app.ts`](https://umijs.org/docs/guides/directory-structure#apptstsx)）

- dist 目录
执行 `umi build` 后产物的默认输出文件夹。可通过 [`outputPath`](https://umijs.org/docs/api/config#outputpath) 配置修改产物输出文件夹。

- mock 目录
存放 mock 文件，此目录下所有 `.ts` / `.js` 文件会被 mock 服务加载，从而提供模拟数据，使用方法详见 [Mock](https://umijs.org/docs/guides/mock) 。

- public 目录
存放固定的静态资源，如存放 `public/image.png` ，则开发时可以通过 `/image.png` 访问到，构建后会被拷贝到输出文件夹。

## src目录
- .umi目录
dev 时的临时文件目录，比如入口文件、路由等，都会被临时生成到这里。

- .umi-production目录
build 时的临时文件目录，比如入口文件、路由等，都会被临时生成到这里。

- app.[ts｜tsx]
[运行时配置](https://umijs.org/docs/api/runtime-config) 文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等。

运行时配置带来的逻辑会在浏览器中运行，因此当有远程配置、动态内容时，这些我们在本地开发时还不确定，不能写死，所以需要在浏览器实际运行项目时动态获取他们。

- layouts/index.tsx
全局布局，默认会在所有路由下生效

- pages目录
约定式路由默认以 `pages/*` 文件夹的文件层级结构来生成路由表。

- global.(css|less|sass|scss)
全局样式文件。

## 路由
### 配置式路由
略

### 约定式路由
	除配置式路由外，Umi 也支持约定式路由。约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。

