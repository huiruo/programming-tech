"use client";

import { Box } from "@mui/system";
import { Menu } from "lucide-react";
import { useDrawerContext } from "../drawer/drawerContext";
import { Drawer } from "../drawer";
import { DocSidebarDesktop } from "../sidebar/desktop";
import { sidebar } from "@/common/router";
import { usePathname } from "next/navigation";

export const Nav = ({ isMobile }: { isMobile: boolean }) => {
  const { toggleDrawer } = useDrawerContext();
  const activePath = usePathname()

  const onGithub = () => {
    window.open("https://github.com/huiruo/programming-tech", "_blank");
  }

  return (
    <nav className="nav">
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}>
        <div className="flex">
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
            width={36}
            sx={{
              ml: "10px",
              borderRadius: "20%",
            }}
          />
        </div>

        <Box
          component={"img"}
          alt="icon"
          src="/github.svg"
          width={30}
          onClick={() => onGithub()}
          sx={{
            mr: "10px",
            borderRadius: "50%",
          }}
        />
      </Box>

      <Drawer anchor={"left"} id="NavDrawer" width={220}>
        {isMobile && <div className="sidebarMobile-container">
          <aside className="sidebar-content">
            <DocSidebarDesktop activePath={activePath} sidebar={sidebar} />
          </aside>
        </div>}
      </Drawer>
    </nav>
  );
};
