import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/jRouter.mdx';

export const metadata = pageMetadata["/react/router"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page