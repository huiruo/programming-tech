import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/setState组件更新和hooks的初始化.mdx';

export const metadata = pageMetadata["/react/setStateRenderAndHooks"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page