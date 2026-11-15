import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/2-babel转化es6.mdx';

export const metadata = pageMetadata["/parsing-inte-co/babelConvertsEs6"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page