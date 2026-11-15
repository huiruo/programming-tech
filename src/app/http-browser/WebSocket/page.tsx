import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/c1-WebSocket和http异同.mdx';

export const metadata = pageMetadata["/http-browser/WebSocket"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page