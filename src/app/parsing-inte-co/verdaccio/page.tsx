import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/parsing-interpretation-compilation/3-verdaccio私有库搭建.mdx';

export const metadata = pageMetadata["/parsing-inte-co/verdaccio"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page