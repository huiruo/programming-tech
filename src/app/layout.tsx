import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";
import { NavWrapper } from "@/components/nav";
import { Provider } from "jotai";

const inter = Inter({ subsets: ["latin"] });

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
      </head>
      <body className={inter.className}>
        <div className='wrapper-box'>
          <NavWrapper />

          <div className='main-container'>
            <Sidebar isMobile={false} />
            <Provider>
              <main className="md-container">
                {children}
              </main>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
