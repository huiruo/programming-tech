import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/promise/01-promise基础.mdx';

export const metadata = pageMetadata["/promise/basics"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page