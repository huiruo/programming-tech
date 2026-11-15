import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/step2-作用域-块级作用域原理.mdx';

export const metadata = pageMetadata["/parsing-inte-co/scope"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page