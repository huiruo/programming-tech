import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/7-代理模式.mdx';

export const metadata = pageMetadata["/designPatterns/proxyMode"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page