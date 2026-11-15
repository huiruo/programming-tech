import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/ts/example.mdx';

export const metadata = pageMetadata["/ts/example"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page