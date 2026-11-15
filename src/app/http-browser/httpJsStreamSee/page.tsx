import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/http-jsStream-see.mdx';

export const metadata = pageMetadata["/http-browser/httpJsStreamSee"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page