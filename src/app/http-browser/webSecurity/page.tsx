import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/13-web安全-XSS-CSRF.mdx';

export const metadata = pageMetadata["/http-browser/webSecurity"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page