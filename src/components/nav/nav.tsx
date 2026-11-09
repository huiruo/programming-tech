"use client";

import { Box } from "@mui/system";
import { Github, Menu } from "lucide-react";
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
            <button
              className="nav-menu-button"
              type="button"
              onClick={() => toggleDrawer("NavDrawer")}
              aria-label="打开知识库导航"
            >
              <Menu size={21} aria-hidden="true" />
            </button>
          )}

          <a className="nav-brand" href="/" aria-label="返回首页">
            <Box
              component={"img"}
              alt=""
              src="/logo.svg"
              width={32}
              sx={{ borderRadius: "20%" }}
            />
            <span>Programming Tech</span>
          </a>
        </div>

        <button className="nav-github-button" type="button" onClick={onGithub} aria-label="在 GitHub 打开项目">
          <Github size={21} aria-hidden="true" />
        </button>
      </Box>

      <Drawer anchor={"left"} id="NavDrawer" width={220}>
        {isMobile && <div className="sidebarMobile-container">
          <aside className="sidebar-content sidebar-content-mobile">
            <DocSidebarDesktop
              activePath={activePath}
              sidebar={sidebar}
              onNavigate={() => toggleDrawer("NavDrawer")}
            />
          </aside>
        </div>}
      </Drawer>
    </nav>
  );
};
