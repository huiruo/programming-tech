import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/keepAlive-对缓存的优化.mdx';

export const metadata = pageMetadata["/nextjs/cacheOptimization"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
