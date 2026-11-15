import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/algorithm/al1TwoSum.mdx';

export const metadata = pageMetadata["/algorithm/twoSum"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page