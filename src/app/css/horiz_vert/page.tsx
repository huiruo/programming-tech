import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/c4horizVert.mdx';

export const metadata = pageMetadata["/css/horiz_vert"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page