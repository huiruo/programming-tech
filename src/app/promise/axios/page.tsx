import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/promise/05-axios.mdx';

export const metadata = pageMetadata["/promise/axios"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page