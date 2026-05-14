
## SharedWorker 和 service worker  的区别
SharedWorker 和 Service Worker 解决的问题不一样，核心区别在“给谁用、怎么活、能干什么”。

SharedWorker
- 目的：同源下多个页面/窗口/iframe 共享一段长期运行的 JS（典型：共享一个 WebSocket 连接、共享缓存、去重订阅）。
- 生命周期：只要还有任意页面连着它，就能一直活着；最后一个断开才结束（相对稳定，适合常驻连接）。
- 通信方式：页面通过 worker.port.postMessage 和它双向通信。
- 网络能力：可以在 worker 里直接发起网络请求/维护 WS（更贴合“行情流中心”）。

### Service Worker
- 目的：拦截网络请求（fetch）、离线缓存、资源更新、后台推送（Push）、Background Sync 等“网站的网络代理/离线层”。

- 生命周期：事件驱动，浏览器可能随时挂起/回收；不保证常驻（不适合长期保持一条不断开的 WS）。

- 通信方式：postMessage、clients.matchAll()、BroadcastChannel 等；但它更像“拦截器”，不是“常驻进程”。

约束：在后台运行限制更多；做实时长连接会不稳定且跨浏览器差异大。

### 对应你的场景（两个浏览器窗口共享 Binance WS，避免限流）：
- SharedWorker：更合适
- Service Worker：不合适（不稳定常驻，WS 维持困难）


## SharedWorker 是浏览器的 Web Workers API 里的一个接口，属于 Web 平台标准 API，不是 Node.js API。
它的作用是：

让多个页面、标签页、iframe 共享同一个后台线程。

属于：

- Worker → 一个页面独占一个线程
- SharedWorker → 多个页面共享一个线程

标准来源： HTML Living Standard（WHATWG） 浏览器实现的 Web API

```js
const worker = new SharedWorker('/worker.js');

worker.port.postMessage('hello');

worker.port.onmessage = (e) => {
  console.log(e.data);
};

// worker.js：
onconnect = (e) => {
  const port = e.ports[0];

  port.onmessage = (event) => {
    console.log(event.data);

    port.postMessage('world');
  };
};
```

## 它和普通 Worker 最大区别：
| API              | 是否共享 | 场景                      |
| ---------------- | ---- | ----------------------- |
| `Worker`         | ❌    | 单页面计算                   |
| `SharedWorker`   | ✅    | 多 tab 共享 websocket / 状态 |
| `Service Worker` | 更高级  | PWA / 缓存 / 离线           |

你这种场景（浏览器里大量 websocket / Binance / Polymarket）其实 SharedWorker 很适合：
一个浏览器只建立：

一个 WS 连接
多 tab 共用

否则：

每个 tab 一个 websocket
很容易几十上百连接
更容易被风控/限流