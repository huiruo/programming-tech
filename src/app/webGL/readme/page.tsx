import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/webGL/0-webgl怎么学.mdx';

export const metadata = pageMetadata["/webGL/readme"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page