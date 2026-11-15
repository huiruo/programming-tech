import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/两个router的区别.mdx';

export const metadata = pageMetadata["/nextjs/twoRouters"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
