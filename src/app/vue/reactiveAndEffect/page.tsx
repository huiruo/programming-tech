import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/reactive和effect.mdx';

export const metadata = pageMetadata["/vue/reactiveAndEffect"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page