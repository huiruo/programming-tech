import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/c3Gradient.mdx';

export const metadata = pageMetadata["/css/gradient"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page