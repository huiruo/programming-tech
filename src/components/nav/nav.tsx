'use client';

import { Box } from "@mui/system";
import { Menu } from "lucide-react";
import { useDrawerContext } from "../drawer/drawerContext";
import { Drawer } from "../drawer";
import { DocSidebarDesktop } from "../sidebar/desktop";
import { usePathname } from 'next/navigation'
import { sidebar } from "@/common/router";

export const Nav = ({ isMobile }: { isMobile: boolean }) => {
  const { toggleDrawer } = useDrawerContext();
  const activePath = usePathname()

  return (
    <nav className="nav">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isMobile && (
          <Box
            onClick={() => toggleDrawer("NavDrawer")}
            component={Menu}
            size={22}
            color={"#000"}
            sx={{
              cursor: "pointer",
              mr: "10px",
            }}
          />
        )}

        <Box
          component={"img"}
          alt="icon"
          src="/logo.svg"
          width={40}
          sx={{
            borderRadius: "50%",
          }}
        />
      </Box>

      <Drawer anchor={"left"} id="NavDrawer" width={220}>
        {isMobile && <div className='sidebarMobile-container'>
          <aside className="sidebar-content">
            <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
          </aside>
        </div>}
      </Drawer>
    </nav>
  );
};
