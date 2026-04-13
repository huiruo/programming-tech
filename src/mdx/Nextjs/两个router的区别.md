
## 
```js
// Next.js 13+（App Router）用 next/navigation
import { useRouter } from "next/navigation" 

// Next.js 12 / Pages Router 用 next/router
import { useRouter } from "next/router"
```

### 🆕 next/navigation

App Router（/app 目录）专用

Next.js 13 / 14 / 15

React Server Components 体系

推荐 & 官方主线

### next/router
Pages Router（/pages 目录）

Next.js 12 及以前

老体系（维护中，但不是未来）

## 问题
router.isReady 只存在于 next/router（Pages Router）
next/navigation（App Router）里压根没有这个概念
```

  }, [router.isReady]) 我用的是page  navigation 没有 isReady 
```

## 为什么 App Router 不需要 isReady？

在 Pages Router 里：

路由参数是 异步注入

刷新时 query 可能是 {}
👉 所以才需要 router.isReady

而 App Router：

路由状态在组件 render 前就已就绪

useSearchParams / useParams 天然 ready

不会出现 “第一次 render 是空参数” 的问题

👉 所以官方直接把 isReady 删了

## 旧写法（Pages Router）
```js
useEffect(() => {
  if (!router.isReady) return
  doSomething(router.query.id)
}, [router.isReady])
```
## ✅ 新写法（App Router）
```js
import { useSearchParams } from "next/navigation"

const searchParams = useSearchParams()
const id = searchParams.get("id")

useEffect(() => {
  if (!id) return
  doSomething(id)
}, [id])
```

## ✅ 场景 2：等动态路由参数 `/user/[id]`
```js
import { useParams } from "next/navigation"

const { id } = useParams()

useEffect(() => {
  if (!id) return
  doSomething(id)
}, [id])
```

## ✅ 场景 3：只是想等 router 可用（其实不需要）
```js
const router = useRouter()

useEffect(() => {
  router.push("/login")
}, [])
```