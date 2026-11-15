import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/nextjs打包优化.mdx';

export const metadata = pageMetadata["/nextjs/buildOptimization"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
