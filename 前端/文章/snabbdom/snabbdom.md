近几年随着 React、Vue 等前端框架不断兴起，Virtual DOM 概念也越来越火，被用到越来越多的框架、库中。Virtual DOM 是基于真实 DOM 的一层抽象，用简单的 JS 对象描述真实 DOM。本文要介绍的 [Snabbdom](https://link.segmentfault.com/?enc=Th3tdBO2Lzn9UWwuttL1mw%3D%3D.Ys4oxa89P9WJUweF%2Fo9ntU8YpNQrSYCCvJtOrO7VgM2DUpEG0T6pfWLcIwuAIHCq) 就是 Virtual DOM 的一种简单实现，并且 Vue 的 Virtual DOM 也参考了 Snabbdom 实现方式。

对于想要深入学习 Vue Virtual DOM 的朋友，建议先学习 Snabbdom，对理解 Vue 会很有帮助，并且其核心代码 200 多行

**本文挑选 Snabbdom 模块系统作为主要核心点介绍，其他内容可以查阅官方文档**[《Snabbdom》](https://link.segmentfault.com/?enc=2wSrMHnXA%2Fs2Trsm17sRxQ%3D%3D.9SkdiOqyWjRfAPNa7L5biey%2F20amj51t0v1BCEpwyrh2sgIcjNcYUyaFi2N1NCqK)。