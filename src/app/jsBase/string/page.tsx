import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/string.mdx';

export const metadata = pageMetadata["/jsBase/string"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page