import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/patch-diff.mdx';

export const metadata = pageMetadata["/vue/patch-diff"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page