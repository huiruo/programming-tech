import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/nextjs-新建项目-tailwind.mdx';

export const metadata = pageMetadata["/nextjs/tailwind"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
