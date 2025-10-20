## vite
- vite:就是借助浏览器原生 ES Modules 能力，当浏览器发出请求时，为浏览器按需提供 ES Module 文件，浏览器获取 ES Module 文件会直接执行，即使首次启动的预构建也是使用速度惊人的esbuild完成，但是要优化的点：首屏、懒加载性能

- webpack:需要构建完整的依赖关系,打包成一个bundle.js

vite的实现原理
1. 基于浏览器 es module import 实现的编译服务
2. 基于 esbuild 做的依赖预构建
3. 基于 hash query 做的强缓存和缓存更新
4. 核心是基于浏览器的 type 为 module 的 script 可以直接下载 es module 模块实现的。

vite同时利用HTTP头来加速整个页面的重新加载(再次让浏览器为我们做更多事情)： 源码模块的请求会根据304 Not Modified进行协商缓存；
依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable进行强缓存;
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="aaa.js"></script>
  </body>
</html>
```

## Webpack
webpack是一个打包模块化 javaScript的工具，它会从main.js出发，

它能够根据配置的入口路径（entry），通过模块间的依赖关系（import/export），识别出源码中的模块化导入语句，递归地找出出入口文件的所有依赖，通过Loader转换文件，将入口和其所有依赖打包到一个单独的文件中。

1. 模块打包
一切文件如 js,css,scss,图片对于webpack都是一个个模块,经过webpack 的处理，最终会输出浏览器使用的静态资源。
2. 编译兼容
通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件

3. 能力扩展。通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

需要通过配置指定的加载器（loader）对相应文件进行转换，也可以通过配置指定的插件（plugins）对上下文进行优化输出（output）为代码块（chunk）

将各种类型的资源，包括图片、css、js等，转译、组合、拼接、生成输出bundle.js,一个IIFE的执行函数。

### webpack核心完成了:内容转换 + 资源合并两种功能，过程包含三个阶段：
1. 初始化阶段
初始化参数：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
创建编译器对象：用上一步得到的参数创建 Compiler 对象
初始化编译环境：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
开始编译：执行 compiler 对象的 run 方法
确定入口：根据配置中的 entry 找出所有的入口文件，调用 Compilation .addEntry 将入口文件转换为 dependence 对象
2. 构建阶段：
编译模块(make)：根据 entry 对应的 dependence 创建 module 对象，调用 loader 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
完成模块编译：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的依赖关系图
3. 生成阶段：
输出资源(seal)：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
写入文件系统(emitAssets)：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## webpack 构建优化常用手段有哪些？
- Tree Shaking；

- SplitChunks 分包；

- DLLPlugin / Module Federation；

- 开启 cache 和持久缓存；

- 使用 esbuild / swc 替代 babel-loader。