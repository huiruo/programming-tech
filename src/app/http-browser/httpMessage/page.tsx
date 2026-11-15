import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/02-http1.1-报文.mdx';

export const metadata = pageMetadata["/http-browser/httpMessage"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page