import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/js/j5nodejs1.mdx';

export const metadata = pageMetadata["/js/nodejs"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page