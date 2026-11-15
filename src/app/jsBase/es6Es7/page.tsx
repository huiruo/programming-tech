import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsBase/7-es6-es7-es8.mdx';

export const metadata = pageMetadata["/jsBase/es6Es7"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page