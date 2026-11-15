import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/22-WebAssembly.mdx';

export const metadata = pageMetadata["/http-browser/webAssembly"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page