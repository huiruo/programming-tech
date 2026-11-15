import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/loop.mdx';

export const metadata = pageMetadata["/jsBase/loop"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page