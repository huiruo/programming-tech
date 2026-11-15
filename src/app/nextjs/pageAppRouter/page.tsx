import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/page和app区别-navigation和router的区别.mdx';

export const metadata = pageMetadata["/nextjs/pageAppRouter"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
