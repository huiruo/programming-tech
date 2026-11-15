import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/algorithm/al2TwoDivide.mdx';

export const metadata = pageMetadata["/algorithm/twoDivide"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page