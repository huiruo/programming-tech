import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/辅-DNS查询过程-DNS污染-IP封锁.mdx';

export const metadata = pageMetadata["/http-browser/DNS"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page