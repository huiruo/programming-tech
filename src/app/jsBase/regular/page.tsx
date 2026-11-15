import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/regular.mdx';

export const metadata = pageMetadata["/jsBase/regular"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page