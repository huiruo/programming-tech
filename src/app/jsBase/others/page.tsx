import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/others.mdx';

export const metadata = pageMetadata["/jsBase/others"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page