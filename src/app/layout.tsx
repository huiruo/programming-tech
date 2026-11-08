import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";
import { NavWrapper } from "@/components/nav";

export const metadata: Metadata = {
  title: "Block-chain",
  description: "block-chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link data-rh="true" rel="icon" href="/logo.svg"></link>
      </head>
      <body>
        <div className='wrapper-box'>
          <NavWrapper />

          <div className='main-container'>
            <Sidebar isMobile={false} />
            <main className="md-container">
              <div className="empty-div" />
              <article className="article">
                {children}
              </article>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
