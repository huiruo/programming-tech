import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/js/j2Vite.mdx';

export const metadata = pageMetadata["/js/vite"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page