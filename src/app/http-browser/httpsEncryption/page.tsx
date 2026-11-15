import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/03-https-加密.mdx';

export const metadata = pageMetadata["/http-browser/httpsEncryption"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page