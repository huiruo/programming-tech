import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/01-TCP-IP-握手.mdx';

export const metadata = pageMetadata["/http-browser/TCPIP"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page