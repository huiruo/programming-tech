主题:对 Next.js 应用工程化、移动端体验、部署链路、性能和复杂业务状态管理 都有实战

我负责 Next.js 移动端项目，重点不是单页功能，而是把它做成接近 App 的体验。我处理过 keep-alive、页面重复挂载、PWA、Cloudflare 部署、Next.js export 与运行时模式切换这类问题，说明我不仅能写页面，也能解决框架层和线上环境的问题。

如果要更“可圈可点”，你可以把项目包装成下面这几个能力标签：

1. 复杂业务前端架构
2. 移动端 Web App 体验优化
3. Next.js 工程化与部署适配
4. PWA / Service Worker / 消息推送
5. 前端性能与疑难问题定位

### 1. 把 Web 做出 App 体验,你不是只做了普通 H5，而是围绕移动端体验做了系统优化：
- 基于 Next.js 做 SPA 式路由切换
- 主 tab 页面做 keep-alive，处理了从业务页返回首页时的重复挂载和页面闪动问题
```
这个项目里一个典型例子就是“页面闪动”：
1. 而是通过 useEffect([]) 是否重复执行，判断页面是否重新 mount
2. 再进一步区分，组件 cleanup、还是 keep-alive 容器结构导致的问题
```
- 支持 PWA，包括 manifest、service worker、安装体验和资源缓存

### 2. 熟悉 Next.js 运行模式和部署差异
处理过：
1. output: "export" 和标准 Next 运行模式的区别
2. 静态导出对路由、PWA、运行时能力的影响
3. Cloudflare Pages / next-on-pages / wrangler.toml / nodejs_compat 这些部署层问题

```
1. 构建脚本
2. 主题生成脚本
4. 资源同步脚本(不同国家资源区分不同构建命令)
比较清晰的页面/组件/状态分层,这能说明你有工程组织能力，而不是把逻辑全堆在页面里。
```


### 3. 能处理复杂业务,有中大型前端业务复杂度的经验
这不是一个简单展示站，而是带强业务流的产品：
1. 登录态、用户信息、活动红点、支付/提现、游戏入口
    - 游戏进入、充值、提现、活动、会员、邀请、通知、登录注册
2. Jotai 全局状态管理,页面之间有很多跳转依赖和状态联动
3. 页面间回跳路径、最近访问路径、业务弹窗联动
4. 活动页、游戏页、充值页之间的状态协调,这种项目能证明你有处理复杂业务

### 4. 有性能和缓存意识
1. 路由预取
2. 图片和静态资源缓存
3. 页面实例复用
4. 避免无意义重渲染和重复导航
5. PWA runtime caching

### 5.国际化和多环境能力
项目里有多语言消息包、环境配置、主题生成、资源同步：
- next-intl
- 不同 .env
- 构建前 theme/image 同步脚本
- 这可以说明你做过面向多地区、多品牌、多环境的项目，而不是单一站点。

### 6.PWA 和消息通知
做过浏览器能力接入,也能体现你对 service worker scope、缓存、推送链路有理解
- 除了 manifest 和 SW，本项目里还有 Firebase messaging、独立 SW 注册冲突处理：
- websocket 业务逻辑推送



### A-1.一个一个来，基于 Next.js 做 SPA 式路由切换，怎么实现的？
我不是自己重写路由，而是基于 Next.js 的客户端路由能力来实现 SPA 切换。具体做法是把项目从 output: export 切回标准运行模式，统一使用 router.push/replace 做导航，再结合 keep-alive 和预取，把主 tab 页面做成接近原生 App 的切换体验。

这个项目里主要是这样实现的：
1. 去掉 output: "export",在 next.config.ts 里去掉 output: "export"，让项目不再走纯静态导出。
这样 Next.js 的客户端路由能力才能正常发挥，不会退化成更接近多页静态站的体验。

2. 用 next/router 做客户端导航,项目里大量页面跳转都不是原生整页刷新，而是：
- router.push(...)
- router.replace(...),例如底部导航、活动跳转、充值/游戏/个人中心这些页面切换，本质上都走的是 Next 的客户端路由，不会触发浏览器整页 reload。

3. 配合 keep-alive 保留页面实例
单纯客户端路由还不够，页面切走后通常还是会卸载。
所以项目里又做了 keep-alive，把首页、推广、充值、邀请、个人中心这些主 tab 页面缓存起来。
这样路由切换时不仅“不刷新”，而且页面实例本身还能保留，体验更像 App。

4. 加预取减少切换等待
比如底部 tab 和部分页面会做`router.prefetch(...)`，提前把目标路由资源拉下来，进一步减少切换时的白屏和等待感。

### A-2.主 tab 页面做 keep-alive，状态保留是怎么实现的。
这个项目的做法是：在布局层缓存页面组件实例，而不是每次路由切换都重新挂载页面。

可以拆成 4 个点讲。

1. 先定义哪些页面需要保活
项目里把主 tab 路由列出来：
```
/ /promotion/ /deposit/ /referral/ /profile/
```

2. 用 Map 缓存页面实例
容器内部维护了一个 `Map<string, CachedComponent>`，按 pathname 存页面：
- pathname
- component
- timestamp

第一次进入某个保活页面时，就把下面组件存进去。重点是缓存的是 React 元素实例，不是只存页面数据。
这样之后再切回来时，可以直接复用那棵组件树。
```
<Component {...pageProps} key={currentPath} />
```

3. 切路由时不卸载，只隐藏
- 真正让状态保留的关键，不是“记住数据”，而是：
- 已缓存页面始终留在 React 树里
- 当前激活页 display: block
- 其他缓存页 display: none

也就是说页面没有被卸载，只是隐藏了。 这样保留下来的就不仅是接口数据，还包括：
1. 组件内部 useState
2. 已渲染的列表
3. 已加载的图片
4. 滚动位置相关 DOM 状态
5. 各种局部 UI 状态
这就是为什么体验会更像 App。

4. 非缓存页单独渲染，不影响缓存页
后来又补了一层关键修正：

以前进入 /game、/central 这类非缓存页时，keep-alive 容器会直接返回当前页，导致缓存页从 React 树里被移除。
这样再回首页时，首页还是会重新 mount。

后面改成：

缓存页一直留在树里
非缓存页只是额外挂一层当前页面
这样从非 tab 页面回主 tab，缓存页也不会丢
这是项目里真正把“主 tab 状态保留”做完整的关键。

一句话术:
我在布局层做了一个 keep-alive 容器，把主 tab 页按 pathname 缓存在 Map 里。切换 tab 时不是卸载页面，而是把非激活页隐藏、激活页显示，这样页面组件实例、局部 state、已加载资源和滚动状态都能保留。后面我还修正了非缓存页切入时把缓存树卸载的问题，保证从游戏页或活动页回首页时也能复用已有页面实例。

### A-3. 支持 PWA，包括 manifest、service worker、安装体验和资源缓存
这个项目的 PWA 不是只挂一个 manifest。我做了完整链路：通过 manifest 和 meta tags 支持安装，通过 next-pwa 接入 service worker，并针对静态产物、图片和字体做 runtime caching；同时还实现了安装状态判断、安装提示控制，以及 Firebase Messaging 与主 PWA service worker 的作用域隔离。

“我不是简单开启 SW，而是按资源类型做了 runtime caching，静态产物、图片和字体分别走不同缓存策略。”

1. Manifest
项目在`src/pages/_document.tsx`里注入了：
```
<link rel="manifest" href="/manifest.json" />
```

2. 同时项目有 public/manifest.json。
  这部分的作用是：
  1. 让浏览器识别这是可安装 Web App
  2. 定义图标、名称、主题色、启动表现
  3. 兼容 Android 和 iOS 的 Web App 安装入口

构建后会生成 public/sw.js，负责接管资源缓存和离线能力基础。这里你可以强调两点：
1. 不是手写零散 SW，而是用 Next 的 PWA 插件接入
2. 但缓存策略是按项目需求自定义的，不是默认全盘套用

3. 资源缓存策略
同样在 next.config.ts 里配置了 runtimeCaching，缓存了几类资源：
```
/_next/static/* StaleWhileRevalidate
用于 Next 静态构建产物，提升页面切换速度

图片资源 CacheFirst 避免重复请求，减少闪动和加载延迟

Google Fonts / Gstatic CacheFirst 提升字体加载稳定性
```

### pwa
这说明你们不是只依赖浏览器默认行为，而是有：

是否可安装判断 是否已安装标记 Web / PWA / App 运行态区分 安装提示节流或次数控制

这在是很加分的，因为很多人只会说“支持 PWA”，但没有真正处理安装体验。

### 推送和 SW 协同
项目还有 Firebase 消息能力，相关在：
```
src/lib/firebase.ts
public/firebase-messaging-sw.js

这里一个很能体现专业度的点是：

项目里显式处理了 Firebase Messaging SW 和 next-pwa 的 SW scope 冲突
不是无脑注册两个 SW，而是考虑作用域隔离和注册逻辑
```

这个项目的处理方式是：不给 Firebase Messaging 复用站点根作用域 / 的 SW，而是给它单独注册一个专用 scope，从而避免和 next-pwa 的主 SW 抢控制权。

具体实现就在 src/lib/firebase.ts (line 61)。

1. 冲突来源是什么
项目里有两类 SW：
next-pwa 生成的主 SW
  - 通常挂在站点根作用域 /
  - 负责静态资源缓存、PWA 能力
2. Firebase Messaging 的 SW
用来接收 FCM 后台推送

如果两者都想占根作用域 /，就会有两个问题：
- 注册时互相覆盖或互相影响
- getRegistration() 取到的可能不是你真正想要的那个 SW

这就是为什么项目里专门写了“避免和 next-pwa 的 Service Worker 冲突”。

2. 实际怎么做的
项目没有直接让 Firebase 用默认根作用域，而是指定了独立 scope：
```js
const swUrl = "/firebase-messaging-sw.js";
const scopePath = "/firebase-cloud-messaging-push-scope/";

// 然后注册时显式写：
navigator.serviceWorker.register(swUrl, { scope: scopePath })

```

这意味着：
1. next-pwa 继续控制 /
2. Firebase Messaging SW 只控制 /firebase-cloud-messaging-push-scope/
3. 两者职责隔离，不互相抢根作用域

为什么还要额外判断 existing scope
项目里还有一段很关键的防御性逻辑：
```js
const existing = await navigator.serviceWorker.getRegistration(scopeUrl);
```

但代码里明确注释了一个坑：
1. getRegistration(url) 返回的是“能控制该 URL 的 SW”
2. 不一定是“scope 精确匹配”的那个 SW
3. 因为如果根作用域 / 已经有 next-pwa 的 SW，它也可能匹配这个 URL
所以项目没有直接信任 existing，而是继续比较：
```js
const desiredScope = new URL(scopeUrl).pathname;
const existingScope = new URL(existing.scope).pathname;
if (existingScope === desiredScope) return existing;
```

也就是说：
只有当现有注册的 scope 和 Firebase 专用 scope 完全一致时，才复用
否则就重新注册 Firebase 自己那份 SW

这个细节很能体现专业度，因为它说明你理解了 Service Worker 匹配规则，不是只会调 API。

4. FCM token 绑定到这份专用 SW
拿 token 时，项目不是默认让 Firebase 自己去猜 SW，而是把这份专用注册显式传进去：
```js
const token = await getToken(messaging, {
  vapidKey,
  ...(swReg ? { serviceWorkerRegistration: swReg } : {}),
});
```

这一步很关键，因为它确保：
FCM token 绑定的是 Firebase 那个专用 SW
不会误绑定到 next-pwa 的主 SW

5. 还做了运行时识别
项目里在 src/components/layout/PanelContent.tsx 还会检查现有 SW registrations，并找：
scope.includes("/firebase-cloud-messaging-push-scope")
说明项目不仅注册时做了隔离，调试和运行时识别也有意识地区分这两类 SW。

你可以这样说：
“项目里同时用了 next-pwa 和 Firebase Messaging，所以我没有让它们共用根作用域的 service worker。主 PWA SW 继续挂在 /，FCM 则单独注册到 /firebase-cloud-messaging-push-scope/。同时我还处理了 getRegistration(url) 可能误拿到根 SW 的问题，会显式比对 scope 后再决定是否复用。最后在 getToken 时把这份专用 registration 显式传给 Firebase，确保推送链路绑定的是正确的 SW。”





