import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/jContext.mdx';

export const metadata = pageMetadata["/react/context"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page