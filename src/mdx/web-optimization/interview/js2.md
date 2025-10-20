## 1. var, let, const 有什么区别？
- var 有变量提升，是函数作用域；
- let 和 const 是块级作用域，并存在“暂时性死区”（TDZ）；
- const 声明常量，不能重新赋值，let 则可以。

## 2. 描述 JavaScript 的执行上下文和作用域链。
执行上下文：是 JS 代码运行的环境，分为全局、函数、eval 三种；

作用域链：由当前执行上下文的变量对象和所有父级上下文构成，用于变量查找。

## 3. 什么是闭包？闭包会造成内存泄漏吗？如何避免？
闭包是函数 + 其词法作用域的组合；

会造成内存泄漏，尤其当闭包长期引用 DOM；

解决方式：及时释放引用、将闭包变量设为 null。

## 4. Promise 和 async/await 有什么关系？
async/await 是基于 Promise 的语法糖；

本质上 await 会暂停当前 async 函数的执行，等待 Promise 完成后继续执行。

## 5.5. 事件循环中微任务和宏任务的区别？
微任务（Microtasks）：如 Promise.then, MutationObserver；

宏任务（Macrotasks）：如 setTimeout, setInterval；

一个宏任务执行完后会清空所有微任务，再进入下一个宏任务。

## 10. new 运算符的原理并手写一个模拟实现
```js
function myNew(Constructor, ...args) {
  let obj = Object.create(Constructor.prototype);
  let res = Constructor.apply(obj, args);
  return typeof res === 'object' && res !== null ? res : obj;
}
```

# 二、异步与事件循环
## 6. 描述浏览器中的事件循环机制，包括微任务与宏任务的执行顺序。
## 7. 宏任务和微任务有哪些常见例子？用 async/await + setTimeout 解释它们的顺序。
## 8. Promise 如何实现链式调用？如果链条中出错了会发生什么？
## 9. async/await 是如何基于 Promise 实现的？它相当于什么语法糖？
## 10. 手写一个简单的 Promise A+ 规范实现。

# 三、对象与原型
## 11. Object.create(null) 和普通对象有何区别？
## 12. 描述 JavaScript 的原型链机制。如何实现 instanceof 的原理？
## 13. 解释 Function.prototype.bind 的原理并手写一个 bind 实现。
## 14. 如何理解 new 运算符？手写一个 new 的模拟实现。

# 函数式与设计模式
## 18. 什么是柯里化？如何实现一个 curry(fn)？
## 19. 什么是节流和防抖？如何实现这两个函数？
## 20. 举例说明你在项目中用过哪些设计模式？（如单例、观察者、策略模式）


# 模块化与工程化
## 21. CommonJS 和 ES Module 有哪些区别？require 和 import 的区别？
## 22. 什么是 Tree Shaking？如何让你的项目更适合做 Tree Shaking？
## 23. 浏览器中如何动态加载模块？（比如 import()

# 七、浏览器相关
24. 浏览器是如何解析 JavaScript 文件的？什么时候会阻塞渲染？
25. setTimeout(fn, 0) 真的会立即执行吗？如果不是，延迟的本质是什么？
26. 浏览器中的同源策略和跨域原理是什么？有哪些跨域解决方案？

# 十、手写题（常考）
1. 手写 debounce(fn, delay)

2. 手写 deepClone，支持循环引用

3. 手写 EventEmitter 类

4. 手写 instanceof 函数

5. 实现一个 compose 函数用于函数管道
