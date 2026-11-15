import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/01-浏览器缓存.mdx';

export const metadata = pageMetadata["/http-browser/browserCache"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page