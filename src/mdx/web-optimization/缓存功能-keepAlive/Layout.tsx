import { ReactNode, useEffect, useRef } from "react"
import { SiteFooter } from "./SiteFooter"
import { Panel } from "./Panel"
import { usePathname } from "next/navigation"
import { indexAtom, useIndexAtom } from "@/hooks/useAtom"
import { CACHE_CONFIG, KEEP_ALIVE_ROUTES, KeepAliveContainer } from "./keepAlive"
import { useAtom } from "jotai"

const showFooterRoutes = ["/", "/promotion/", "/deposit/", "/referral/", "/profile/"]

export default function Layout({
  children,
  Component,
  pageProps,
}: {
  children: ReactNode
  locale: string
  pagePropsLocale: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps?: any
}) {
  const pathname = usePathname() || ""
  const gameListRef = useRef(null)
  const { updateScrollDom } = useIndexAtom()
  const [{ scrollDom }] = useAtom(indexAtom)

  useEffect(() => {
    if (gameListRef.current) {
      // 优化滚动位置更新 - 只在组件挂载时执行一次
      updateScrollDom(gameListRef.current)
    }

    // 锁定 body 防止双滚动条
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(()=>{

    return(()=>{
      scrollDom?.scrollTo(0, 0)
    })
  },[pathname])

  return (
    <div className="fixed inset-0 flex justify-center bg-main-full">
      <div className="relative w-full max-w-[420px] flex flex-col bg-main-primary">
        <Panel />

        <main ref={gameListRef} className="flex-1 overflow-y-auto overscroll-contain pb-14 hidden-scrollbar">
          {Component && pageProps ? (
            <KeepAliveContainer
              Component={Component}
              pageProps={pageProps}
              cacheRoutes={KEEP_ALIVE_ROUTES}
              maxAge={CACHE_CONFIG.maxAge}
              enableExpiration={CACHE_CONFIG.enableExpiration}
            />
          ) : (
            children
          )}
        </main>
        {showFooterRoutes.includes(pathname) && <SiteFooter pathname={pathname} />}
      </div>
    </div>
  )
}
