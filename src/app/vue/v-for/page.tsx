import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/vfor-nextTick.mdx';

export const metadata = pageMetadata["/vue/v-for"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page