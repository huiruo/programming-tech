import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/readme.mdx';

export const metadata = pageMetadata["/vue/readme"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page