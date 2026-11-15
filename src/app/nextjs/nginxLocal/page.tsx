import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/nginx安装在本地.mdx';

export const metadata = pageMetadata["/nextjs/nginxLocal"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
