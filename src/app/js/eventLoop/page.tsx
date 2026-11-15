import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/js/j1EventLoop.mdx';

export const metadata = pageMetadata["/js/eventLoop"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page