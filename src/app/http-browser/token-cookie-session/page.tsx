import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/06-鉴权-Token和JWT-cookie-session.mdx';

export const metadata = pageMetadata["/http-browser/token-cookie-session"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page