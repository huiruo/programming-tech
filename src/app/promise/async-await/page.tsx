import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/promise/04-async-await.mdx';

export const metadata = pageMetadata["/promise/async-await"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page