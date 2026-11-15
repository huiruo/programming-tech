import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/3-this-箭头函数.mdx';

export const metadata = pageMetadata["/jsBase/this"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page