import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/c2-Socks5-Shadowsocks.mdx';

export const metadata = pageMetadata["/http-browser/socks5"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page