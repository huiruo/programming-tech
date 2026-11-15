import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/web-optimization/0-optimization.mdx';

export const metadata = pageMetadata["/web-optimi/optimization"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page