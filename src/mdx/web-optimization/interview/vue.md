### 首次渲染流程
renderComponentRoot 执行构建ast生成的render() 生成vnode
组件挂载前:onBeforeMount在什么时候执行?

## 异同
虚拟 dom,以数据为驱动的开发模式;vue 和 react 同样采用的是虚拟 dom,渲染时找出差异修改;vue:vnode,react:fiber tree。

单向数据流，单向数据流就是 model 的更新会触发 view 的更新，view 的更新不会触发 model 的更新，它们的作用是单向的

vue 模版引擎：Vue 使用 template 模版进行编译的，所以在编译的时候可以很好对静态节点进行分析然后进行打补丁标记，然后在 Diff 的时候，Vue2 是判断如果是静态节点则跳过过循环对比，而 Vue3 则是把整个静态节点进行提升处理，Diff 的时候是不过进入循环的，所以 Vue3 比 Vue2 的 Diff 性能更高效。

react 模版引擎：React 使用 JSX 进行编译的，是无法进行静态节点分析的

React使用的是babel
vue @vue/compiler-core
渲染/更新方式:
在 Vue 中，一个组件在渲染期间依赖于自动追踪，因此 vue 框架知道提前哪一个组件需要渲染当组件状态发生改变时。每个组件可以被认为具有自动为你实现 react shouldComponentUpdate。

react 改变 state,react 不允许直接更改状态，需要 setState(),并且批量地对 state 进行更新以提高性能的,减少渲染次数,react 采用函数式更新。

Vue2 和 Vue3 的比对和更新是同步进行的，这个跟 React15 是相同的，就是在比对的过程中，如果发现了那些节点需要移动或者更新或删除，是立即执行的，也就是 React 中常讲的不可中断的更新，如果比对量过大的话，就会造成卡顿，所以 React16 起就更改为了比对和更新是异步进行的，所以 React16 以后的 Diff 是可以中断，Diff 和任务调度都是在内存中进行的，所以即便中断了，用户也不会知道。

Vue2 和 Vue3 都使用了双端对比算法，而 React 的 Fiber 由于是单向链表的结构，所以在 React 不设置由右向左的链表之前，都无法实现双端对比。

## 前言:模板引擎
从初始化data开始，到解析 template 模版，进行依赖收集。

从data改变，通知渲染 Effect 更新，到页面变化。

宏观流程
1. compiler: template-->AST抽象语法树-->code render函数
```
AST-->render()
注意:如果在webpack：

用vue-loader将.vue文件编译成js，然后使用render函数渲染，打包的时候就编译成了render函数需要的格式，不需要在客户端编译;
Vue 文件是如何被 compile-core 编译核心模块编译成渲染函数的?

如果有配置，直接使用配置的render函数，如果没有，使用运行时编译器，把模板编译成render函数。

在执行render函数的过程中会搜集所有依赖，将来依赖发生变换时会执行updateComponent函数。

在执行_update的过程中，会触发patch函数，由于目前还没有旧的虚拟DOM tree，因此直接为当前的虚拟DOM tree的每一个节点生成对应elm属性，即真实DOM。

最终会把创建好的组件实例挂载到vnode的componentInstance属性中，以便复用。
```

2. reactivity: 响应式,effect 副作用函数
  - Vue3 用 ES6的Proxy 重构了响应式，new Proxy(target, handler)
  - Proxy 的 get handle 里 执行track() 用来收集依赖(收集 activeEffect，也就是 effect )
  - Proxy 的 set handle 里执行 trigger() 用来触发响应(执行收集的 effect)

3. runtime: 运行时相关功能，虚拟DOM(即：VNode)、diff算法、真实DOM操作等
重点：`render.call(proxyToUse,..)调用ast生成的render生成vnode`

## api-lifecycle-vue3-vue2区别
- 性能提升 1：Vue.js 3 通过更好的模板编译器和优化算法，Vue3 编译器中增加了静态提升技术。
- 性能提升 2：Vue.js 3 的响应式系统进行了升级，现在支持 Proxy，可以更加精细地控制响应式数据。
- 理解reactive和effect
- proxy-defineProperty区别
- 更好的 TypeScript 支持
- 全新的合成式 API（Composition API）可以提升代码的解耦程度 —— 特别是大型的前端应用，效果会更加明显。还有就是按需引用的有了更细微的可控性，让项目的性能和打包大小有更好的控制。
- Tree-shaking 优化：Vue3 中对于 Tree-shaking 做了优化，使得只有使用到的代码会被打包，减小应用程序的体积。
- Fragments（片段）：Vue3 中支持使用 Fragments（片段）来包裹多个子组件，而无需创建额外的包装器 div。只需要在 template 中使用<template>标签来包裹即可
```js
onBeforeMount(() => {
  console.log("组件挂载前onBeforeMount");
});

onMounted(() => {
  console.log("组件挂载后onMounted");
});

onBeforeUpdate(() => {
  console.log("初次渲染不会执行:组件更新前onBeforeUpdate");
});

onUpdated(() => {
  console.log("初次渲染不会执行:组件更新后onUpdated");
});

onBeforeUnmount(() => {
  console.log("组件销毁前onBeforeUnmount");
});
onUnmounted(() => {
  console.log("组件销毁后onUnmounted");
});
```

## vue3:v-if 比 v-for 的优先级更高
当它们同时存在于一个节点上时，v-if 比 v-for 的优先级更高。

```
扩展：vue2中:v-for比v-if优先，即每一次都需要遍历整个数组，影响速度:
```

## keep-alive原理是什么?
使用 keep-alive 包裹动态组件时，会对组件进行缓存，避免组件重新创建
使用有两个场景，一个是动态组件，一个是 router-view
```
如果不需要缓存，直接返回虚拟节点。

如果需要缓存，就用组件的id和标签名，生成一个key，把当前vnode的instance作为value，存成一个对象。这就是缓存列表

如果设置了最大的缓存数，就删除第0个缓存。新增最新的缓存。

并且给组件添加一个keepAlive变量为true，当组件初始化的时候，不再初始化。
```


## Vue 的响应式原理？Vue2 与 Vue3 的实现有什么不同？
Vue2：基于 Object.defineProperty；

Vue3：基于 Proxy，支持深度监听、数组等。
