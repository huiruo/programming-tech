import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/webGL/1-变换矩阵.mdx';

export const metadata = pageMetadata["/webGL/matrix"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page