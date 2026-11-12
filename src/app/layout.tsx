import type { Metadata, Viewport } from "next";
import { Sidebar } from "@/components/sidebar";
import { PwaRegistration } from "@/components/pwa/PwaRegistration";
import "./globals.css";
import { NavWrapper } from "@/components/nav";
import { ArticleToc } from "@/components/articleToc";

export const metadata: Metadata = {
  title: "Programming Tech",
  description: "前端、工程化与技术实践知识库",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#e4e8ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Programming Tech" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Programming Tech" />
      </head>
      <body>
        <PwaRegistration />
        <div className='wrapper-box'>
          <NavWrapper />

          <div className='main-container'>
            <Sidebar isMobile={false} />
            <main className="md-container">
              <div className="empty-div" />
              <article className="article">
                {children}
              </article>
              <ArticleToc />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
