import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/react-api.mdx';

export const metadata = pageMetadata["/react/reactApi"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page