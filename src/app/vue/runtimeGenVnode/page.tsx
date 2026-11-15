import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/runtime-render生成之后-vnode构建.mdx';

export const metadata = pageMetadata["/vue/runtimeGenVnode"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page