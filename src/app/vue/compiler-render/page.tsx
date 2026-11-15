import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/compiler-生成AST-转换AST为render.mdx';

export const metadata = pageMetadata["/vue/compiler-render"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page