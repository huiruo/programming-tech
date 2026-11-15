import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/防抖节流.mdx';

export const metadata = pageMetadata["/js/throttleDebounce"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page