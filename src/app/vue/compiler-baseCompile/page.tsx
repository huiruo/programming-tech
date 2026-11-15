import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/compiler-baseCompile.mdx';

export const metadata = pageMetadata["/vue/compiler-baseCompile"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page