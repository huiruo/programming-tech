import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/css/c5Grid.mdx';

export const metadata = pageMetadata["/css/grid"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page