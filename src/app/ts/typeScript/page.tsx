import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/ts/1-typeScript.mdx';

export const metadata = pageMetadata["/ts/typeScript"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page