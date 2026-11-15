import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/render阶段-completeWork中的diff.mdx';

export const metadata = pageMetadata["/react/renderDiff"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page