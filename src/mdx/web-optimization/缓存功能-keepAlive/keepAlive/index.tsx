import { ReactElement, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

// 配置需要缓存的路由
export const KEEP_ALIVE_ROUTES = [
  "/",
  "/promotion/",
]

// 缓存配置
export const CACHE_CONFIG = {
  maxAge: 10 * 60 * 1000,
  enableExpiration: true,
}

interface CachedComponent {
  pathname: string
  component: ReactElement
  timestamp: number
}

interface KeepAliveContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
  cacheRoutes: string[]
  maxAge?: number
  enableExpiration?: boolean
}

export const KeepAliveContainer = ({
  Component,
  pageProps,
  cacheRoutes,
  maxAge = 10 * 60 * 1000,
  enableExpiration = true,
}: KeepAliveContainerProps) => {
  const [cachedComponents, setCachedComponents] = useState<Map<string, CachedComponent>>(new Map())
  const pathname = usePathname() || ""

  const currentPath = pathname === "/" ? "/" : `${pathname}/`

  const shouldCache = (pathname: string) =>
    cacheRoutes.some(route => route.endsWith('*') ? pathname.startsWith(route.slice(0, -1)) : pathname === route)

  const isCacheExpired = (timestamp: number) => enableExpiration && Date.now() - timestamp > maxAge

  useEffect(() => {
    if (!shouldCache(currentPath)) return

    setCachedComponents(prev => {
      const newCache = new Map(prev)
      const existing = newCache.get(currentPath)

      if (!existing || isCacheExpired(existing.timestamp)) {
        newCache.set(currentPath, { pathname: currentPath, component: <Component {...pageProps} key={currentPath} />, timestamp: Date.now() })
      } else {
        newCache.set(currentPath, { ...existing, timestamp: Date.now() })
      }

      return newCache
    })
  }, [currentPath])

  return (
    <>
      {Array.from(cachedComponents.entries()).map(([pathname, cached]) => {
        const isActive = pathname === currentPath
        return (
          <div key={pathname} style={{ display: isActive ? 'block' : 'none', height: '100%' }}>
            {cached.component}
          </div>
        )
      })}

      {!cachedComponents.has(currentPath) && <Component {...pageProps} key={currentPath} />}
    </>
  )
}