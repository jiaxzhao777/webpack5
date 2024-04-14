### 1. module bundle chunk 的区别

module 就是没有被编译之前的代码，通过 webpack 的文件引用关系生成 chunk 文件, webpack 处理好 chunk 文件后，生成运行在浏览器中的代码 bundle

- js/css/图片等，每一个文件都可以理解为 module
- import 包，分包，split chunk ---> chunk
- bundle 是 webpack 最终生成的产物, xxxx.bundle.js

### 2. entry 入口文件

css 可以作为 entry 入口文件

### 3.Loader

loader 让 webpack 可以去处理其他类型的文件，并将他们转换为有效模块

### 4.manifest

一旦你的应用在浏览器中以 index.html 文件的形式被打开，一些 bundle 和应用需要的各种资源都需要用某种方式被加载与链接起来。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack 优化 之后，你精心安排的 /src 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 **webpack_require** 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

manifest 可以帮助我们改善性能

### 5.webpack 配置文件支持异步输出

应用场景: 配置文件依赖某些后台的配置

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: "./app.js",
      });
    }, 5000);
  });
};
```

### 6.Hash, ChunkHash, ContentHash 的区别

- Hash: 根据 webpack 所有模块生成，有任何变化重新生成，而且唯一
- ChunkHash: 根据 chunk 所有的依赖生成的，只要 chunk 中的依赖发生变化就会重新生成。但是也有问题，如异步加载的组件, css, js
- ContentHash: 根据文件，项目中一般使用，没有前面两种出现的问题

### 7. Module Oneof

每个不同类型的文件在 loader 转换时, 会遍历 module 中 rules 中所有 loader,
而 oneOf 则是当有一个 loader 能够进行转换时，则不再遍历

### 8. Resolve

这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。关于 resolver 具体如何工作的更多解释说明

### 9.Plugins

一组 webpack 插件。例如，DefinePlugin 允许你创建可在编译时配置的全局常量。这对需要再开发环境构建和生产环境构建之间产生不同行为来说非常有用。

### 10.Cache

https://juejin.cn/book/7115598540721618944/section/7118367662249345024?enter_from=course_center&utm_source=course_center

### 11. Target

构建目标除了浏览器和 node, 还有构建 electron 等

### 12.externals

忽略指令的依赖

### 13.performance

webpack 性能提示

### 14.stats

webpack 日志输出的一些配置

### 15.性能优化

1. 解决多入口依赖抽取问题(面试时可说)
   https://bundlers.tooling.report/code-splitting/multi-entry/

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    another: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    runtimeChunk: "single",
  },
};
```

2. 预加载和预获取
   a. 预获取: 在页面 A 去请求 B
   b. 预加载: 组件分包
