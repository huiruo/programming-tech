// hooks/useKeepAliveRouter.ts
"use client"

import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { atom, useAtom } from "jotai"
import { KEEP_ALIVE_ROUTES } from "@/components/layout/keepAlive/KeepAlive"

// 当前显示的 KeepAlive 页面路径
export const keepAlivePathAtom = atom<string>("")

// 强制刷新标记（可选）
export const forceRefreshAtom = atom<number>(0)


// 工具：统一路径末尾加 /
export const normalizePath = (path: string) => path.endsWith('/') ? path : `${path}/`

export function isKeepAliveRoute(pathname: string) {
  return KEEP_ALIVE_ROUTES.includes(normalizePath(pathname))
}

export const useKeepAliveRouter = () => {
  const router = useRouter()
  const [keepAlivePath, setKeepAlivePath] = useAtom(keepAlivePathAtom)
  const [forceRefresh, setForceRefresh] = useAtom(forceRefreshAtom)

  // 初始化同步当前路径
  useEffect(() => {
    const currentPath = normalizePath(router.pathname)
    if (!keepAlivePath) {
      setKeepAlivePath(currentPath)
    }
  }, [])

  // 路由变化时同步 keepAlivePath
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const pathname = normalizePath(url.split("?")[0])
      setKeepAlivePath(pathname)
    }
    router.events?.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange)
    }
  }, [router, setKeepAlivePath])

  // 核心导航方法
  const navigateToCache = useCallback((href: string) => {
    const normalized = normalizePath(href)

    if (!isKeepAliveRoute(normalized)) {
      router.push(href)
      return
    }

    // 已缓存并且当前显示页面就是目标页面，直接 return
    if (keepAlivePath === normalized) return

    // 缓存页面尚未显示过：首次进入 => router.push
    if (!keepAlivePath || keepAlivePath !== normalized) {
      router.push(normalized)
      return
    }

    // 缓存页面已存在，SPA 内切换
    setKeepAlivePath(normalized)
    if (window.location.pathname !== normalized) {
      window.history.pushState(null, '', normalized)
    }
  }, [keepAlivePath, router, setKeepAlivePath])

  const refreshCurrentPage = useCallback(() => {
    setForceRefresh(prev => prev + 1)
  }, [setForceRefresh])

  return {
    keepAlivePath,
    navigateToCache,
    refreshCurrentPage,
    forceRefresh,
  }
}
