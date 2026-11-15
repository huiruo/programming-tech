import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/step1-预解析-变量提升.mdx';

export const metadata = pageMetadata["/parsing-inte-co/pre-analysis"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page