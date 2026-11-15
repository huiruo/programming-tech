import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/辅-浏览器兼容性.mdx';

export const metadata = pageMetadata["/http-browser/compatibility"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page