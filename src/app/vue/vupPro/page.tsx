import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/vuePro.mdx';

export const metadata = pageMetadata["/vue/vupPro"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page