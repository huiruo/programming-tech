import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/readme.mdx';

export const metadata = pageMetadata["/react/readme"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page