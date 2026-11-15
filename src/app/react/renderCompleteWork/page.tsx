import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/render阶段-completeWork.mdx';

export const metadata = pageMetadata["/react/renderCompleteWork"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page