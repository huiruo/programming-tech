import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/algorithm/al3ThreeSum.mdx';

export const metadata = pageMetadata["/algorithm/threeSum"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page