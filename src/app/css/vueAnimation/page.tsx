import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/5-vue动画.mdx';

export const metadata = pageMetadata["/css/vueAnimation"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page