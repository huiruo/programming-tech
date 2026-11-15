import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/watch-computed.mdx';

export const metadata = pageMetadata["/vue/computed"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page