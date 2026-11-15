import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/step3-执行上下文-函数调用栈-this.mdx';

export const metadata = pageMetadata["/parsing-inte-co/contextFunction"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page