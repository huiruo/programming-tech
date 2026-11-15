import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/c1Css.mdx';

export const metadata = pageMetadata["/css/basis"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page