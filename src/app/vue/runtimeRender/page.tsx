import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/runtime-VNode构建之后-开始渲染.mdx';

export const metadata = pageMetadata["/vue/runtimeRender"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page