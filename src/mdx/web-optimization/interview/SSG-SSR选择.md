| 渲染方式    | 代表含义                                    | 页面生成时机         | 是否支持 SEO     | 是否需要 Node 服务            | 典型场景              |
| ------- | --------------------------------------- | -------------- | ------------ | ----------------------- | ----------------- |
| **CSR** | Client-Side Rendering（客户端渲染）            | 浏览器运行时才生成      | ❌ 差，需要 JS 执行 | ❌ 不需要                   | SPA、后台管理系统        |
| **SSR** | Server-Side Rendering（服务端渲染）            | 每次请求动态生成       | ✅ 非常好        | ✅ 需要 Node               | 登录后个性化内容          |
| **SSG** | Static Site Generation（静态站点生成）          | **构建时**生成 HTML | ✅ 非常好        | ❌ 不需要（CDN 即可）           | 博客、文档、官网          |
| **ISR** | Incremental Static Regeneration（增量静态生成） | 首次构建 + 过期再更新   | ✅ 好          | ✅ 需要 Node 或 Vercel Edge | 大量动态内容但不需实时性，如商品页 |

### 增量静态生成-ISG
有时用户想使用SSG，但又想定期更新内容，这时候增量静态生成（ISG）大有帮助。

ISG让用户可以在构建静态页面后在指定的时间间隔后创建或更新静态页面。这样一来，用户不需要重建整个站点，只需重建需要它的页面。

ISG保留了SSG的优点，又增加了为用户提供最新内容的好处。ISG非常适合站点上那些使用不断变化的数据的页面。比如说，用户可以使用ISR渲染博文，以便在编辑文章或添加新文章后博客保持更新。

若要使用ISR，将revalidate属性添加到页面上的getStaticProps函数中。
```js
export async function getStaticProps() {
  const res = await fetch('https://.../data')
  const data = await res.json()
  return {
    props: {
      data,
    },
    // 在这里，当请求在60秒后到来时，Next.js将尝试重新构建页面。下一个请求将产生带有更新页面的响应。
    revalidate: 60
  }
}
```



# SSG vs CSR (比如用Create React App)
create-react-app，直接 yarn build 完成后，将 build 目录下的 index.html 作为入口文件，再通过 nginx 的路径去访问我们的项目。

如果你要做 SSG，就尽量把数据放在 getStaticProps 里，而不是放在 useEffect 里。

使用ssg的优势,这样可以实现真正的静态数据预渲染
- SEO,你看打包后的资源是带html结构的
- 提升首屏速度
| 对比项                 | CSR（比如Create React App）                   | Next.js SSG（getStaticProps） |
| ------------------- | --------------------------------------- | --------------------------- |
| **首屏内容是否预渲染？**      | ❌ 否（空的 `<div id="root"></div>`，靠 JS 渲染） | ✅ 是（构建时生成完整 HTML）           |
| **是否需要 JS 才能看到内容？** | ✅ 需要 JS 执行完才有内容                         | ❌ 不需要，HTML 就有完整内容           |
| **爬虫是否能抓到完整内容？**    | ❌ 不能（需要执行 JS）                           | ✅ 可以                        |
| **用户体验（加载速度）**      | 首屏慢、容易白屏                                | 首屏快、无闪烁                     |
| **页面大小/性能**         | bundle 大、不能裁剪路由                         | 更小、更快、按页优化                  |


CSR： ⛔ 浏览器收到后要等 JS 下载 + 执行，才生成 DOM。
```html
<body>
  <div id="root"></div>
  <script src="main.js"></script>
</body>
```

Next.js + SSG：
```html
<body>
  <div id="__next">
    <main>
      <h1>游戏大厅</h1>
      <p>热门游戏：xxxx</p>
    </main>
  </div>
</body>
```

```js
export async function getStaticProps() {
  const res = await fetch('https://example.com/api/posts')
  const posts = await res.json()

  return {
    props: { posts },
  }
}

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(p => <p key={p.id}>{p.title}</p>)}
    </div>
  )
}
```

CSR 完全靠浏览器渲染，Next.js SSG 是构建时生成结构、用 useEffect 补充数据，两者差别主要在首屏 HTML 和 SEO。

如果你希望数据对用户和爬虫都立刻可见，就不要把关键数据请求放在 useEffect 里，而是放在 getStaticProps 或 getServerSideProps 里。


🚀 为什么 Next.js SSG 更适合生产首屏：
- 静态生成 HTML + CSS + Critical JS
- 自动路由分包
- CDN 友好，可以全局加速
- 可以选择哪些页面静态，哪些实时（比 CSR 灵活）

## 问题我是ssg,你的项目使用的是 SSG（getStaticProps），但数据又是实时变动的游戏数据，这就是经典冲突场景：
```
getStaticProps 是 构建时运行，数据被“写死”在打包后的 HTML 文件中：

优点：快，支持 CDN 缓存；

缺点：数据一旦构建完，就不变了（除非你重新构建或用 ISR）；

所以它 不适合需要“实时更新”的数据，比如游戏状态、在线人数等。
```

1. ✅ 解决方案一：SSG + useEffect 客户端拉数据
```js
// getStaticProps 构建时拿不到游戏状态
export async function getStaticProps() {
  return { props: {} } // 静态内容，如页面结构
}

export default function GamePage() {
  const [gameInfo, setGameInfo] = useState(null)

  useEffect(() => {
    fetch('/api/gameStatus').then(res => res.json()).then(setGameInfo)
  }, [])

  return (
    <div>
      {gameInfo ? <p>{gameInfo.status}</p> : <p>加载中...</p>}
    </div>
  )
}
```

2. ✅ 解决方案二：SSG + ISR（增量静态再生）
如果数据不是秒级变化，而是每几分钟更新一次，可以用 ISR：
```js
export async function getStaticProps() {
  const res = await fetch('https://api.xxx.com/game-status')
  const gameInfo = await res.json()

  return {
    props: { gameInfo },
    revalidate: 60, // 每 60 秒重新生成 HTML
  }
}
```

3. ✅ 解决方案三：将关键数据用 SSR 渲染，其他仍然 SSG
你可以混合使用 SSG 和 SSR：

- 首页或基本路由用 getStaticProps；

- 游戏详情页 /game/[id] 用 getServerSideProps；

- 或者通过 Edge SSR 方案，在边缘节点实时渲染；



# SSG vs SSR
⚖️ 一图流对比：SSG vs SSR 性能 & 适配性

✅ SSG（Static Site Generation） 中文叫 “静态站点生成”，Next.js 的 getStaticProps() 和 next export 就是它的代表。
```js
// pages/index.tsx
export async function getStaticProps() {
  const data = await fetchData(); // 从接口拉数据
  return { props: { data } };
}
```

| 维度                 | `SSG + next export` （静态导出） | `SSR`（服务器端渲染）       |
| ------------------ | -------------------------- | ------------------- |
| **首屏加载速度**         | ✅ 快，HTML 文件预生成，CDN 缓存      | ❌ 慢，页面每次访问都需服务器动态生成 |
| **后端服务器压力**        | ✅ 极低，无需服务器                 | ❌ 高，访问越多，服务器压力越大    |
| **适合登录**             | ✅ 适合（客户端存 token）           | ✅ 更灵活（可 SSR 鉴权）     |
| **需要实时个性化内容**      | ❌ 不适合，需要客户端加载              | ✅ 适合，如 SSR 显示“欢迎某某” |
| **动态国际化（i18n）**    | ⚠️ 有限制，需要预构建               | ✅ 灵活，动态加载语言包        |
| **部署复杂度**          | ✅ 简单，静态站+API               | ❌ 中等，需要服务器或 SSR 服务  |
| **SEO**                 | ✅ 非常好                      | ✅ 非常好               |
| **用户体验一致性**        | ⚠️ 客户端加载数据有时会闪             | ✅ SSR 首屏渲染一致性高      |


##  建议选择：SSG（next export）更适合你目前的结构
你的项目特点：
- 用户登录 ✅（前端控制，或调后端 API）
- 没有对每个用户高度个性化的首页内容 ✅
- 不想用复杂部署 ✅
- → 这些都适合用 SSG + 客户端动态控制（比如 login/token）

你应该使用 SSG 的情况：
| 场景                | 原因                   |
| ----------------- | -------------------- |
| 📄 文章、博客、文档、帮助页等  | 内容稳定、SEO 重要          |
| 🧭 首页、展示页         | 不依赖用户信息，可预先生成        |
| 🌍 多语言静态页面        | 每个语言一套 HTML，构建时生成即可  |
| 🔌 嵌套 iframe 的游戏页 | 页面本身稳定，不需个性化         |
| 🚀 要求极致性能的页面      | SSG 页面可用 CDN 缓存，加载超快 |

你不适合 SSR 的理由（目前）：
- 没有必须 SSR 渲染的动态个性化页面。
- SSR 会增加部署和成本（需要 Node 服务，不可部署在纯静态平台如 GitHub Pages）。
- 如果你 iframe CDN、token 传参等客户端控制，其实不受 SSR 帮助。

你应该使用 SSR 的情况：
| 场景                      | 原因              |
| ----------------------- | --------------- |
| 🧑‍💼 页面依赖登录用户信息（如个人主页） | 每个用户看到的内容不同     |
| 📈 实时数据展示（如交易行情、库存、价格）  | 访问时需保证数据是最新     |
| 🚫 页面不能提前构建（如订单详情页，需鉴权） | 构建时无法知道页面内容     |
| ⏱ 数据频繁更新的页面（如活动页倒计时）    | 不能靠构建时定死 HTML   |
| 🏢 管理后台页面               | 需要验证权限，并返回个性化页面 |


## 在使用 next export 导出静态网站时，有哪些功能无法使用？
❌ 无法使用或受限的功能

| 功能                                    | 是否支持    | 说明                                                                                 |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `getServerSideProps`                  | ❌ 不支持   | 因为没有服务器运行时，无法动态生成页面。                                                               |
| API Routes（如 `/api/xxx`）              | ❌ 不支持   | 因为不会输出 `pages/api` 下的任何内容。                                                         |
| 动态路由（不使用 `getStaticPaths`）            | ❌ 不支持   | 所有动态页面必须提前通过 `getStaticPaths` 列出路径。                                                |
| 中间件（Middleware）                       | ❌ 不支持   | 依赖边缘运行时，纯静态无法支持。                                                                   |
| Image Optimization（`next/image` 默认行为） | ❌ 不支持   | `next/image` 的图片优化功能依赖服务器。必须用 `unoptimized` 模式或替代方案。                               |
| 国际化自动路由（i18n routing）                 | 部分支持    | 不自动生成语言前缀路径，需手动生成（或用 cookie 控制语言）。                                                 |
| rewrites / redirects                  | ❌ 不支持   | `next.config.js` 中的 rewrites 和 redirects 不生效。需要用静态 Web Server（如 Netlify/Vercel）配置。 |
| ISR（增量静态生成）                           | ❌ 不支持   | 没有服务器缓存层，无法动态生成新页面或更新。                                                             |
| 动态 meta tags（如每篇文章的 title）            | ✅ 受限    | 只能通过 SSG `getStaticProps` 写入；无法在客户端动态设置 `<head>` 并影响爬虫。                            |
| 客户端 Cookie 判断后跳转                      | ✅ 需自行实现 | 必须通过 JS 实现 redirect，无法靠服务端判断。                                                      |

✅ 可以使用的功能
| 功能                             | 说明                            |
| ------------------------------ | ----------------------------- |
| `getStaticProps`               | 支持生成静态页面内容。                   |
| `getStaticPaths`               | 支持生成动态路由静态页面。                 |
| `next/link` 和 `next/router`    | 全部支持，只是必须确保路径已导出为静态 HTML。     |
| 自定义 `App`, `Document`, `Head`  | 均支持。                          |
| Tailwind、MUI、Emotion 等样式框架     | 均支持。                          |
| 客户端数据请求（如 `fetch`, SWR, Axios） | 可以，但属于 CSR 模式，需在浏览器加载后才请求。    |
| PWA 支持                         | 可以结合静态导出使用 Service Worker 支持。 |


### Next.js 中使用第三方客户端库（如地图、富文本编辑器）时出现 "window is not defined"，如何解决？
1. Next.js 提供 next/dynamic 动态导入功能，可以禁用服务端渲染（只在客户端加载）：

```js
import dynamic from "next/dynamic";

// 动态导入组件，并禁用 SSR
const RichTextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false,
});

export default function Page() {
  return <RichTextEditor />;
}
```

2. ✅ 解决方法二：在 useEffect 中使用依赖 window 的代码
```js
import { useEffect, useState } from "react";

export default function Page() {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    // 此处代码只会在浏览器端执行
    const L = require("leaflet"); // 或者动态导入 import("leaflet")
    const mapInstance = L.map("map-id").setView([51.505, -0.09], 13);
    setMap(mapInstance);
  }, []);

  return <div id="map-id" style={{ height: "400px" }} />;
}
```
