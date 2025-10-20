# nextjs
1. getStaticProps 和 getServerSideProps 有哪些区别？分别适用于什么场景？


## 2. Next.js 的页面预渲染机制有哪些？它们各自的优缺点是什么？
1. 静态生成（Static Generation，SG）,即在构建时生成 HTML，并在部署时就准备好。

✅ 优点：
性能极高：HTML 文件在构建时生成，部署后可以直接从 CDN 提供服务，速度极快。

可被缓存：适用于不频繁变化的内容，利于 SEO。

支持增量静态生成（ISR）：不必重新构建全站，某一页面可以按需静态更新。

❌ 缺点：
构建时间可能较长：页面多或数据量大时构建慢。

不适合频繁变动的数据：如用户个性化内容、实时数据。

使用方式：
- getStaticProps()：在构建时获取数据。
- getStaticPaths()：配合动态路由生成多个静态页面。

2. 服务端渲染（Server-side Rendering，SSR）
即每次请求时，服务端生成 HTML 返回客户端。

✅ 优点：
支持动态数据：每次请求都能获取最新数据。

适合登录用户、个性化内容：如用户中心、订单详情页。

良好 SEO 支持：与 SG 一样，返回完整 HTML。

❌ 缺点：
性能依赖服务端响应：每次请求都要服务端生成 HTML，响应慢、并发高时压力大。

不易缓存：尤其对于高度动态的页面。

使用方式：
getServerSideProps()：每次请求时运行，用于获取数据并渲染页面。

3. 客户端渲染（Client-side Rendering，CSR）,虽然不是“预渲染”，但 Next.js 也支持:

某些页面只在客户端用 useEffect 拉取数据。

## 1. getStaticProps 和 getServerSideProps 有哪些区别？分别适用于什么场景？
- getServerSideProps 适用场景（服务端渲染）
适用于：需要每次请求获取最新数据 或 需要访问请求上下文（如 cookie）
```
每次请求都运行函数，获取最新数据。

适合需要依赖请求参数（如 query、headers）场景。
```

- getStaticProps 适用场景（静态生成）
适用于：数据更新不频繁 或 可容忍延迟更新的页面

示例场景：
```
博客文章页（文章内容固定）

产品展示页（商品信息更新不频繁）

文档页

营销页、落地页（Landing Page）

首页（配合 ISR 支持定时刷新）
```

特点：
- HTML 在构建时生成，可部署到 CDN，加载极快。
- 可通过 revalidate 参数开启 ISR（增量静态再生）。
```js
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/posts');
  return {
    props: { data },
    revalidate: 60, // ISR，每60秒重新生成
  };
}
```

## 3. app/ 目录与 pages/ 有什么不同？你是否已经使用 App Router？你更推荐哪个？
app/ 目录是 Next.js 13 引入的新架构（App Router），相比传统的 pages/（Pages Router），它提供了更现代、更灵活的方式构建应用。

是的，我已经使用过 app/ 目录构建项目。我使用过 layout.tsx 来实现页面的嵌套结构和持久导航，还用 loading.tsx 实现过页面加载状态。也体验过 React Server Components 带来的性能优化，比如在服务端直接 fetch() 数据并传入组件，避免客户端请求。

| 对比项                | `pages/` 目录（Pages Router）               | `app/` 目录（App Router）                |
| ------------------ | --------------------------------------- | ------------------------------------ |
| 引入版本               | 早期版本，一直存在                               | Next.js 13 起正式引入（14 后更成熟）            |
| 架构模型               | 基于文件的路由（传统）                             | 基于文件 + React Server Components（RSC）  |
| 路由机制               | 自动基于文件名创建路由                             | 同样支持自动路由，但结构更灵活                      |
| 服务端渲染方式            | 通过 `getServerSideProps`                 | 默认使用 RSC（更轻量）                        |
| 页面状态保持             | 切换页面会重置状态                               | 使用 `layout.tsx` 可共享状态（如导航不重置）        |
| 嵌套路由支持             | 支持有限                                    | 原生支持嵌套路由和布局                          |
| 代码拆分粒度             | 按页面级别                                   | 更细粒度，按组件模块拆分                         |
| 数据请求方式             | `getStaticProps` / `getServerSideProps` | `fetch()` 支持直接在组件中使用（RSC）            |
| 页面布局（layout）       | 需要手动封装 Layout 组件                        | 原生支持 `layout.tsx` 并自动嵌套              |
| Client/Server 组件区分 | 不支持（默认都是 Client）                        | 默认组件是 Server 组件，可用 `'use client'` 声明 |
| SEO 与 metadata     | 使用 `<Head>` 手动写                         | 使用 `metadata` 对象结构化定义                |
| 状态管理方式             | 通常使用客户端库                                | 可混合 RSC + 客户端状态库                     |


🚀 App Router 的优势
模块化更强（layout、loading、error 等）

支持 React Server Components（RSC）

数据请求更自由、灵活

原生嵌套路由和布局

渐进增强、并发渲染

❌ App Router 的挑战
学习曲线稍高（如 RSC、布局嵌套）

和旧项目兼容性问题（app/ 和 pages/ 不可混用路由）

一些社区插件不完全支持（早期版本）

## 4. 如何在 Next.js 中设计一个多语言支持的国际化站点？有哪些方式（如路由前缀、cookie、Accept-Language）？

```
"next-intl": "^4.0.2",
```

```js
import Cookies from 'js-cookie';
import { defaultLocale } from "@/common/constants";
import enMessages from '../../public/messages/en.json';
import { NextIntlClientProvider } from "next-intl";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // 初始化时用默认语言包做占位，避免闪烁
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<Record<string, any>>(enMessages);

  const locale = Cookies.get('locale') || defaultLocale;

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const msgs = await import(`../../public/messages/${locale}.json`);
        setMessages(msgs.default || msgs);
      } catch (error) {
        console.error("Failed to load messages:", error);
        setMessages({});
      }
    };

    loadMessages();
  }, [locale]);

  if (!messages) {
    return <div>Loading...</div>;
  }

  return (
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        <JotaiProvider store={jotaiStore}>
          <Layout locale={locale} pagePropsLocale={pageProps.locale}>
            <Toaster position="top-center" />
            <Component {...pageProps} messages={messages} />
          </Layout>
        </JotaiProvider>
      </NextIntlClientProvider>
  );
}
```

## 如何提升 Next.js 网站的首屏加载速度？
✅ 一、使用合适的渲染模式

| 渲染方式                 | 特点                  | 首屏性能 |
| -------------------- | ------------------- | ---- |
| `getStaticProps`     | 预渲染静态内容，构建时生成 HTML  | ⭐⭐⭐⭐ |
| `getServerSideProps` | 每次请求都生成 HTML，适合动态内容 | ⭐⭐   |
| `ISR`（增量静态再生）        | 结合了静态和动态，适合内容定期更新   | ⭐⭐⭐  |

✅ 二、页面级代码拆分
Next.js 会自动按页面拆分 JS，但你还可以：

- 使用 动态导入（next/dynamic） 拆分不影响首屏的组件，例如模态框、图表、富文本编辑器等：

- prefetch() 预加载用户很可能点击的路由（Next.js 自动完成，但也可手动触发）

- 添加 loading="lazy" 到非首屏图片、iframe


✅ 三、静态资源优化

- 使用 next/image 自动压缩并延迟加载图片：
```js
import Image from 'next/image';

<Image
  src="/hero.png"
  width={600}
  height={400}
  alt="Hero"
  priority // 👈 首屏图片使用 priority 优先加载
/>
```

- ✅ 预加载字体和关键图片
```
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/images/hero.jpg" as="image" />
```

✅ 四、减少 JS 体积

使用 Bundle Analyzer 分析打包体积：
```js
// npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});
```

✅ 五、合理设置缓存策略
使用 HTTP 缓存：

Cache-Control: public, max-age=31536000, immutable 用于静态资源

启用 CDN 加速（如 Vercel、Cloudflare、阿里云 CDN）

## 六、 使用性能监测工具:Lighthouse（Chrome DevTools）
切换到 chrome Lighthouse 面板
点击顶部的 “Lighthouse” 标签页。找不到时点三点菜单 → 更多工具（More tools）→ Lighthouse。

🔹 4. 配置测试选项
Device（设备类型）：

✅ Mobile（推荐）— 模拟移动设备，检测首屏性能、网络慢加载等

Desktop（桌面）

Categories（检测维度）：

默认勾选 Performance、Accessibility、Best Practices、SEO

可选 PWA（如果你做了渐进式应用）

Mode（运行模式）：

Navigation（默认）适用于大部分网页加载场景

🔹 5. 运行分析
点击蓝色按钮 “Analyze page load”（分析页面加载）。

此时页面会重新加载，并在模拟的慢网速+低性能手机环境中运行评估。

✅ 三、查看 Lighthouse 分析结果
| 指标类别           | 含义                   |
| -------------- | -------------------- |
| Performance    | 首屏加载时间、渲染时间等（首屏速度核心） |
| Accessibility  | 页面是否适配残障人士访问         |
| Best Practices | 是否符合 web 安全与现代开发标准   |
| SEO            | 是否有利于搜索引擎收录          |
| PWA            | 是否具备 PWA 功能（可选）      |

🔍 关键性能指标解释（Performance）

| 指标名                      | 含义                     |
| ------------------------ | ---------------------- |
| First Contentful Paint   | 页面首个文本/图片出现的时间（首屏速度）   |
| Largest Contentful Paint | 最大可视元素（如 Banner 图）加载时间 |
| Speed Index              | 页面内容加载速度的可视反馈          |
| Time to Interactive      | 页面可响应用户交互的时间           |
| Total Blocking Time      | JS 阻塞时间，反映交互卡顿         |
| Cumulative Layout Shift  | 页面元素跳动的程度（布局稳定性）       |


结果参考：
| 指标                          | 结果        | 建议            |
| --------------------------- | --------- | ------------- |
| ⏱ First Contentful Paint    | **2.0s**  | 可接受，建议 < 1.8s |
| 🖼 Largest Contentful Paint | **3.3s**  | 偏慢，建议 < 2.5s  |
| 🛑 Total Blocking Time      | **250ms** | 较高，建议 < 150ms |
| 🐢 Speed Index              | **6.7s**  | 偏慢，建议 < 4.3s  |
| ✅ CLS（布局跳动）                 | 0         | 非常好 👍        |


## 编写一个登录态中间件，只允许登录用户访问某些页面。 中间件在什么时候执行?
✅ 在请求到达页面或 API 路由之前，在边缘节点（Edge Runtime）执行。

这意味着：
- 页面组件还没开始渲染；
- getStaticProps 或 getServerSideProps 还没执行；
- 你可以提前判断请求是否合法，并决定是否 重定向、返回 403、还是放行。

🛠️ 示例：登录态中间件 middleware.ts
```js
// middleware.ts (位于项目根目录)

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 需要登录的路径前缀
const protectedRoutes = ['/dashboard', '/profile', '/game']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否访问的是受保护的路径
  const requiresAuth = protectedRoutes.some((path) => pathname.startsWith(path))
  if (!requiresAuth) return NextResponse.next()

  // 假设我们把登录态保存在 cookie 中
  const token = request.cookies.get('token')?.value

  // 如果没有登录，重定向到登录页
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname) // 可选：加上跳转回来源页面
    return NextResponse.redirect(loginUrl)
  }

  // 已登录，放行
  return NextResponse.next()
}
```

你需要在项目根目录创建 middleware.ts，并确保在 next.config.js 中设置好匹配的路径（可选）：
```js
// next.config.js
module.exports = {
  // 默认情况下 middleware 会匹配所有路径，可用 matcher 限制
  matcher: ['/dashboard/:path*', '/profile/:path*', '/game/:path*']
}
```

✅ 中间件 vs 页面鉴权区别:
| 特性        | 中间件（`middleware.ts`） | 页面内鉴权（如在 `getServerSideProps` 中） |
| --------- | -------------------- | -------------------------------- |
| 执行时机      | 请求刚进入（非常早）           | 页面渲染时                            |
| 是否运行在边缘节点 | ✅ 是                  | ❌ 不是（在服务器）                       |
| 能否阻止页面加载  | ✅ 可以提前重定向            | ✅ 可以，但慢一点                        |
| 适合        | 快速重定向、不访问页面逻辑时       | 需要用户详细信息或动态内容时                   |


# React
## React 的 setState 是同步还是异步的？为什么说它是“批量更新”？
答：在合成事件和生命周期中是异步的，在原生事件和 setTimeout 中是同步的。

React 会合并多次 setState 调用，执行一次批量更新（batching）。

## 3. 虚拟 DOM 和真实 DOM 有什么区别？VDOM 如何 diff 的？
VDOM 是一种 JS 对象的轻量表示。

React 使用 双端 diff + key 对比，Vue 使用 双指针对比 + 最长递增子序列 优化 patch。

## 说说你对 Fiber 架构的理解？
React Fiber 是一种链表结构替代递归调用栈，使更新可中断。

特点：可中断、优先级、可恢复。


# react 
## 如何设计一个自定义的组件库？

- 使用 monorepo（pnpm workspace）；
- 每个组件使用独立入口和 ts 类型；
- Storybook 文档；
- 支持主题切换、tree shaking、按需加载。
- Verdaccio 私有 npm 仓库