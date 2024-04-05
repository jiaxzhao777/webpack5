### 1. module bundle chunk 的区别

module 就是没有被编译之前的代码，通过 webpack 的文件引用关系生成 chunk 文件, webpack 处理好 chunk 文件后，生成运行在浏览器中的代码 bundle

- js/css/图片等，每一个文件都可以理解为 module
- import 包，分包，split chunk ---> chunk
- bundle 是 webpack 最终生成的产物, xxxx.bundle.js

### 2. entry 入口文件

css 可以作为 entry 入口文件

### 3.Loader

loader 让 webpack 可以去处理其他类型的文件，并将他们转换为有效模块
