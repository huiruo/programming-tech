import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/render阶段-mountIndeterminateComponent构建fiber树.mdx';

export const metadata = pageMetadata["/react/renderBuildFiberTree"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page