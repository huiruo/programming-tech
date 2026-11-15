import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/c7JsDom.mdx';

export const metadata = pageMetadata["/css/jsDom"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page