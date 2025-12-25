import { ReactNode, useEffect, useRef, useState } from "react"

export interface KeepAliveConfig {
  // 缓存页面列表
  cacheRoutes: string[]
  // 缓存时长（毫秒），默认 10 分钟
  maxAge?: number
  // 是否启用缓存时长检查
  enableExpiration?: boolean
}

interface CacheItem {
  pathname: string
  element: ReactNode
  timestamp: number
  scrollTop?: number
}

interface KeepAliveProps {
  currentPath: string
  children: ReactNode
  config: KeepAliveConfig
  onRouteExpired?: (pathname: string) => void
}

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

export const KeepAlive = ({
  currentPath,
  children,
  config,
  onRouteExpired
}: KeepAliveProps) => {
  const { cacheRoutes, maxAge = 10 * 60 * 1000, enableExpiration = true } = config

  // 缓存的页面组件
  const [cacheComponents, setCacheComponents] = useState<Map<string, CacheItem>>(new Map())

  // 用于强制刷新的计数器
  const [refreshKey, setRefreshKey] = useState(0)

  // 定时器引用
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 检查路径是否需要缓存
  const shouldCache = (pathname: string) => {
    return cacheRoutes.some(route => {
      // 支持精确匹配和通配符匹配
      if (route.endsWith('*')) {
        const prefix = route.slice(0, -1)
        return pathname.startsWith(prefix)
      }
      return pathname === route
    })
  }

  // 检查缓存是否过期
  const isCacheExpired = (timestamp: number) => {
    if (!enableExpiration) return false
    return Date.now() - timestamp > maxAge
  }

  // 清除过期缓存
  const clearExpiredCache = () => {
    setCacheComponents(prev => {
      const newCache = new Map(prev)
      let hasExpired = false

      newCache.forEach((item, pathname) => {
        if (isCacheExpired(item.timestamp) && pathname !== currentPath) {
          newCache.delete(pathname)
          hasExpired = true
          console.log(`[KeepAlive] Clear expired cache: ${pathname}`)
          onRouteExpired?.(pathname)
        }
      })

      return hasExpired ? newCache : prev
    })
  }

  // 更新当前路径的缓存
  useEffect(() => {
    if (shouldCache(currentPath)) {
      setCacheComponents(prev => {
        const newCache = new Map(prev)
        const existingCache = newCache.get(currentPath)

        // 如果缓存存在且未过期，更新时间戳
        if (existingCache && !isCacheExpired(existingCache.timestamp)) {
          newCache.set(currentPath, {
            ...existingCache,
            timestamp: Date.now(),
          })
          console.log(`[KeepAlive] Update cache timestamp: ${currentPath}`)
        } else {
          // 否则创建新缓存
          newCache.set(currentPath, {
            pathname: currentPath,
            element: children,
            timestamp: Date.now(),
          })
          console.log(`[KeepAlive] Create new cache: ${currentPath}`)
        }

        return newCache
      })
    }
  }, [currentPath, children])

  // 定期检查过期缓存
  useEffect(() => {
    if (!enableExpiration) return

    // 每30秒检查一次
    timerRef.current = setInterval(() => {
      clearExpiredCache()
    }, 30 * 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [enableExpiration, maxAge])

  // 手动刷新当前页面
  const refreshCurrentPage = () => {
    setCacheComponents(prev => {
      const newCache = new Map(prev)
      newCache.delete(currentPath)
      return newCache
    })
    setRefreshKey(k => k + 1)
  }

  // 清除所有缓存
  /*
    const clearAllCache = () => {
      setCacheComponents(new Map())
      setRefreshKey(k => k + 1)
    }
  */

  // 如果当前路径不需要缓存，直接渲染
  if (!shouldCache(currentPath)) {
    return <>{children}</>
  }

  // 检查当前页面缓存是否过期
  const currentCache = cacheComponents.get(currentPath)
  const isCurrentExpired = currentCache && isCacheExpired(currentCache.timestamp)

  // 如果过期，清除缓存并重新渲染
  if (isCurrentExpired) {
    console.log(`[KeepAlive] Current page cache expired, reloading: ${currentPath}`)
    setTimeout(() => refreshCurrentPage(), 0)
    return <>{children}</>
  }

  return (
    <>
      {Array.from(cacheComponents.entries()).map(([pathname, item]) => {
        const isActive = pathname === currentPath
        const isExpired = isCacheExpired(item.timestamp)

        // 过期的非当前页面不渲染
        if (isExpired && !isActive) {
          return null
        }

        return (
          <div
            key={`${pathname}-${refreshKey}`}
            style={{
              display: isActive ? 'block' : 'none',
              height: '100%',
              overflow: 'hidden',
            }}
            data-keep-alive-path={pathname}
            data-cache-time={new Date(item.timestamp).toLocaleTimeString()}
          >
            {isActive ? children : item.element}
          </div>
        )
      })}

      {/* 当前路径没有缓存时的渲染 */}
      {!cacheComponents.has(currentPath) && (
        <div style={{ height: '100%', overflow: 'hidden' }}>
          {children}
        </div>
      )}
    </>
  )
}

// 导出用于外部调用的工具函数
export const useKeepAliveControl = () => {
  const getCacheInfo = () => {
    // 这里可以通过全局状态或者 ref 获取缓存信息
    return {
      cacheCount: 0,
      cacheKeys: [] as string[],
    }
  }

  return {
    getCacheInfo,
  }
}