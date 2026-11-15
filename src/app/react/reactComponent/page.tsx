import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/类组件渲染流程-组件分类.mdx';

export const metadata = pageMetadata["/react/reactComponent"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page