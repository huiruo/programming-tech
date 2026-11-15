import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/c2Layout.mdx';

export const metadata = pageMetadata["/css/layout"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page