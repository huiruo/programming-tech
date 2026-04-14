主题:对 Next.js 应用工程化、移动端体验、部署链路、性能和复杂业务状态管理 都有实战

负责 Next.js 移动端项目，重点不是单页功能，而是把它做成接近 App 的体验。我处理过 keep-alive、页面重复挂载、PWA、Cloudflare 部署、Next.js export 与运行时模式切换这类问题，说明我不仅能写页面，也能解决框架层和线上环境的问题。

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
1. 而是通过 `useEffect([])` 是否重复执行，判断页面是否重新 mount
2. 再进一步区分，组件 cleanup、还是 keep-alive 容器结构导致的问题
```
- 支持 PWA，包括 manifest、service worker、安装体验和资源缓存

### 2. 熟悉 Next.js 运行模式和部署差异
处理过：
1.  静态导出output: "export" 和标准 Next 运行模式的区别
2. Cloudflare Pages / next-on-pages / wrangler.toml / nodejs_compat 这些部署层问题

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

### 推送和 SW 协同
pwa 这说明你们不是只依赖浏览器默认行为，而是有：

是否可安装判断 是否已安装标记 Web / PWA / App 运行态区分,安装提示节流或次数控制

这在是很加分的，因为很多人只会说“支持 PWA”，但没有真正处理安装体验。

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

这一步很关键，因为它确保： FCM token 绑定的是 Firebase 那个专用 SW,不会误绑定到 next-pwa 的主 SW

5. 还做了运行时识别
项目里在 src/components/layout/PanelContent.tsx 还会检查现有 SW registrations，并找：
scope.includes("/firebase-cloud-messaging-push-scope")
说明项目不仅注册时做了隔离，调试和运行时识别也有意识地区分这两类 SW。

你可以这样说：
“项目里同时用了 next-pwa 和 Firebase Messaging，所以我没有让它们共用根作用域的 service worker。主 PWA SW 继续挂在 /，FCM 则单独注册到 /firebase-cloud-messaging-push-scope/。同时我还处理了 getRegistration(url) 可能误拿到根 SW 的问题，会显式比对 scope 后再决定是否复用。最后在 getToken 时把这份专用 registration 显式传给 Firebase，确保推送链路绑定的是正确的 SW。”


### service worker、资源缓存
可以。这部分你在面试里最好讲成两层：
Service Worker 怎么接入 资源缓存策略怎么设计,这个项目两层都有，不只是“开了 PWA”。

1. Service Worker 是怎么接入的
项目在 next.config.ts 里通过 @ducanh2912/next-pwa 接入 PWA：
```
register: true
skipWaiting: true
clientsClaim: true
dest: "public"

register: true
  自动注册 SW，不需要手写一套注册脚本
skipWaiting: true
  新 SW 安装后不长时间等待旧 SW 退出，尽快接管
clientsClaim: true
新 SW 激活后立即接管当前页面，提高更新生效速度
```
这意味着构建后会生成站点主 SW，比如 /sw.js，并在客户端自动注册。
这几个配置的作用可以这样讲：

2. 主 SW 负责什么
主 SW 主要负责：
- Next 静态资源缓存
- 图片缓存
- 字体缓存
- 提升重复访问和页面切换速度
- 为 PWA 提供离线基础能力

### 3. ws 资源缓存是怎么配的
主要有三类。

第一类：/_next/static/*
策略是： StaleWhileRevalidate

适合 Next.js 构建产物，比如：
- JS chunk
- CSS
编译后的静态资源
为什么用这个策略：
先优先返回缓存，页面切换快
后台再请求最新版本更新缓存
用户感知更顺滑，适合框架静态资源
这是典型的“体验优先，同时兼顾更新”的做法。

第二类：图片资源
策略是： CacheFirst
并且设置了：
最大条目数
最大缓存时间
只缓存 0 / 200 响应

为什么图片用 CacheFirst：
图片是最容易导致页面“闪”和二次加载感的资源
尤其首页 banner、活动图、图标类资源，如果每次切换回来都重新请求，体验会很差
CacheFirst 能最大限度复用本地缓存
这也是你们项目“切回首页更像 App”的一个基础。

第三类：Google Fonts / Gstatic
也是 CacheFirst。

原因是字体资源：
更新频率低
网络抖动时很影响首屏观感
做长缓存收益高
所以这里是很典型的静态公共资源缓存策略。

4. 为什么不是全都一把梭缓存
这个项目没有粗暴地“所有请求都缓存”，而是按资源类型拆策略。

这是面试里很值得说的点，因为这说明你理解缓存不是越多越好，而是要按资源特性选择：

框架产物：StaleWhileRevalidate
图片：CacheFirst
字体：CacheFirst
动态接口：不直接让 SW 冒然兜底缓存


## output: "export" 和标准 Next 运行模式的区别
框架理解深度:
- output: "export" 是把 Next 当成 静态站点生成器
- 标准 Next 运行模式是把 Next 当成 真正的应用运行时

1. output: "export" 是什么
加了 output: "export" 后，Next 构建时会把页面导出成纯静态文件：
- index.html 各路由对应的 html 静态
- JS / CSS / 图片资源
- 浏览器访问时不依赖 Node 运行时

最终你得到的是一个可以直接丢到静态托管上的站点，比如：
Nginx 静态目录 OSS GitHub Pages Cloudflare Pages 静态资产

```
这是你项目里最有感知的一点。
output: "export" 下：
1. 虽然也能有前端跳转,但更容易退化成“静态页面之间切换”
2. 某些场景下会更容易出现重新加载、资源重新请求、页面状态不保留

标准模式下：
router.push / router.replace 的客户端路由能力更完整
更适合做真正的 SPA 化体验,配合 keep-alive、prefetch、PWA，更容易做到像 App 一样顺滑

- 底部 tab 切换更稳定
- 页面不容易整页感闪动
- JS 不会像静态页切换那样更容易重新跑
- 图片和静态资源缓存更容易协同
- PWA 配置不需要继续围绕静态导出做额外补丁
```

2. 标准 Next 运行模式是什么,或者部署到支持 Next 运行时的平台。
这时 Next 不只是“吐静态文件”，而是保留了应用运行能力：
- 路由运行时
- 服务端能力
- API route
- 重写 / 中间层逻辑
- 更完整的客户端路由和资源管理能力
- 它更像一个完整 Web 应用框架，而不是静态站点导出器。

### 为什么 output: "export" 下，即使你用了 router.push，体验也未必能真正像 SPA
可以这样说
“router.push 只代表我在用客户端导航，但它不等于真正的 SPA 体验。output: "export" 下页面本质还是静态导出页，组件更容易重新挂载，资源和运行时协同也更弱，所以即使用了 router.push，用户仍然可能感知到页面闪动、状态丢失和资源重载。真正接近 App 的体验，需要配合 keep-alive、资源缓存、导航路径治理和标准 Next 运行模式一起做。”

router.push 只是导航动作，它不自动保证“页面实例不重建、资源不重载、状态不丢失”。

output: "export" 下，即使你表面上还在用 router.push，整体运行模型依然更偏向“静态页面切换”，所以体验未必真像 SPA。

1. router.push 只解决“不是整页浏览器跳转”
它能避免最粗暴的：
```js
window.location.href = "/xxx"
<a href="/xxx"> // 导致整页重载
```
但它不能保证：
1. 页面组件不重新 mount
2. 页面状态被保留
3. 图片不重新请求
4. 资源不重新评估
5. 真正像 SPA，要靠更完整的运行时协同，而不只是一个 router.push。

### 7. 真正像 SPA 需要什么
至少要同时满足：

1. 路由走客户端导航
2. 页面实例尽量复用
3. 关键 tab 页面 keep-alive
4. 返回路径不要乱用浏览器历史回退
5. 静态资源有缓存
6. 页面 cleanup 不要误触发二次导航
7. PWA / SW / 资源加载链路稳定
少了这些，router.push 只是“形式上前端跳转”，不是“体验上像 App”。

## 8.国际化
项目国际化基于 next-intl 实现，当前语言从 Cookie 读取，并按 locale 动态加载语言包。为了避免首屏语言包异步加载带来的闪烁，我在 _app 层先用默认语言做占位，再异步替换成目标 messages；如果加载失败则回退到默认语言。这样既保证了多语言能力，也兼顾了首屏体验和容错性。

1. 技术方案
项目用的是 next-intl。 在 _app.tsx 里通过：
- NextIntlClientProvider
- 把当前语言包注入到整个应用里。
- 页面和组件里再通过： `useTranslations()`

“我做的是按 locale 动态加载 message bundle，而不是简单硬编码全量语言包。”

语言包加载方式
项目不是在构建时把所有语言全塞进去，而是在运行时按语言动态加载, 这有两个好处：
- 语言资源按需加载
- 不把所有语言一次性塞进首屏包体
```js
const msgs = await import(`../../public/messages/${locale}.json`)
```
