import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/3-animation.mdx';

export const metadata = pageMetadata["/css/animation"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page