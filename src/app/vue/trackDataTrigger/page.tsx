import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/vue/首次渲染的track和data改变的trigger.mdx';

export const metadata = pageMetadata["/vue/trackDataTrigger"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page