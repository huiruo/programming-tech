import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/promise/02-promise具体实现.mdx';

export const metadata = pageMetadata["/promise/promise"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page