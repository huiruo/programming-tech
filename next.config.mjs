import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
// const nextConfig = {};

const nextConfig = {
  // Add support for MDX files
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'], // Support .mdx and .md files as pages

  webpack: (config, { isServer }) => {
    // Add MDX loader to handle MDX files
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            // Optionally add MDX loader configuration here
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
