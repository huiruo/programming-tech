'use client';

import { usePathname } from 'next/navigation'
import { DocSidebarDesktop } from './desktop'
import { sidebar } from '@/common/router'
import { DocSidebarMobileMenu } from './mobile';

export const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const activePath = usePathname()

  return (
      <div className='sidebar-container'>
        <aside className="sidebar-content">
          {/* <DocSidebarDesktop activePath={activePath} sidebar={sidebar} /> */}
          <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
          {/* <DocSidebarDesktop activePath={activePath} sidebar={sidebar} /> */}
        </aside>
      </div>
  )
}