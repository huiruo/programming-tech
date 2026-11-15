import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/库-redux.mdx';

export const metadata = pageMetadata["/react/redux"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page