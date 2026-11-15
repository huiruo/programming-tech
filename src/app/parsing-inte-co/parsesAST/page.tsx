import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/0-Parser解析得到AST-Ignition解释得到字节码.mdx';

export const metadata = pageMetadata["/parsing-inte-co/parsesAST"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page