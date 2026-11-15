import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/promise/03-Generator.mdx';

export const metadata = pageMetadata["/promise/generator"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page