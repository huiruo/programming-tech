import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/react-commit阶段.mdx';

export const metadata = pageMetadata["/react/commit"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page