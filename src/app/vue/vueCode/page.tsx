import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/VueCode.mdx';

export const metadata = pageMetadata["/vue/vueCode"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page