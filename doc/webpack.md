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
   与预获取指令相比，预加载指令有许多不同之处：

- 预加载 chunk 会在父 chunk 加载时以并行方式开始加载；而预获取 chunk 会在父 chunk 加载结束后开始加载。
- 预加载 chunk 具有中等优先级，并会立即下载；而预获取 chunk 则在浏览器闲置时下载。
- 预加载 chunk 会在父 chunk 中立即请求，用于当下时刻；而预获取 chunk 则用于未来的某个时刻。
- 浏览器支持程度不同。

3. 优化

- webpack 保持最新版本，Node.js 尽量最新版本
- loader 通过 include 定义编译的范围
- 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为 他们会增加文件系统调用的次数。
- 如果不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
- 如果使用自定义解析插件规则，并且没有指定上下文，可以设置 resolve.cacheWithContext: false。

- DLL 优化
  1. 优化后需要 2 步
  - npm run dll
  - npm run dev

### 深入理解 chunk

1. webpack 首先根据`entry`配置创建若干 Chunk 对象

2. 遍历构建阶段找到所有的 Module 对象, 同一 Entry 下的模块分配到 Entry 对应的 Chunk 中

3. 遇到异步模块则创建新的 Chunk 对象，并将异步模块放入该 Chunk；

4. 分配完毕后，根据 SplitChunksPlugin 的启发式算法进一步对这些 Chunk 执行裁剪、拆分、合并、代码调优，最终调整成运行性能(可能)更优的形态；

5. 最后，将这些 Chunk 一个个输出成最终的产物(Asset)文件，编译工作到此结束。

### SplitChunksPlugin 的主体流程如下

1. SplitChunksPlugin 尝试将命中 minChunks 规则的 Module 统一抽到一个额外的 Chunk 对象；

2. 判断该 Chunk 是否满足 maxInitialRequests 阈值，若满足则进行下一步

3. 判断该 Chunk 资源的体积是否大于上述配置项 minSize 声明的下限阈值；
   - 如果体积小于 minSize 则取消这次分包，对应的 Module 依然会被合并入原来的 Chunk
   - 如果 Chunk 体积大于 minSize 则判断是否超过 maxSize、maxAsyncSize、maxInitialSize 声明的上限阈值，如果超过则尝试将该 Chunk 继续分割成更小的部分

若此时 Webpack 配置的 minChunks 大于 2，且 maxInitialRequests 也同样大于 2，如果 common 模块的体积大于上述说明的 minSize 配置项则分包成功，common 会被分离为单独的 Chunk，否则会被合并入原来的 3 个 Chunk
miSize
