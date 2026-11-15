import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/js/j3webpack2.mdx';

export const metadata = pageMetadata["/js/webpack2"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page