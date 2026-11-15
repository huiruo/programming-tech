import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/ts/2-interface-type.mdx';

export const metadata = pageMetadata["/ts/interfaceType"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page