import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/1-闭包-内存生命周期.mdx';

export const metadata = pageMetadata["/parsing-inte-co/closureMemory"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page