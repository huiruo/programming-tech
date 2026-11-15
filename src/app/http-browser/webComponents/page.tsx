import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/23-WebComponents.mdx';

export const metadata = pageMetadata["/http-browser/webComponents"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page