import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  localeDetection: true,
  /**
   * trailingSlash: true, 不希望 /de 自动映射到 de.html，可以让 next.config.js 直接导出 de/index.html
   * /next/out/
   * ├── de/index.html
   * ├── en/index.html
   * */
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  /**
   * 服务端渲染才生效
   */
  // i18n: {
  //   locales: ["en", "de"],
  //   defaultLocale: "en",
  // },
};

export default nextConfig;
