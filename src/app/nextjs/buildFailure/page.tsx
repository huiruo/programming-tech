import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/遇到的构建失败难题.mdx';

export const metadata = pageMetadata["/nextjs/buildFailure"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
