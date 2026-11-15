import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/12-浏览器渲染进程-浏览器内核之渲染引擎和JS引擎-V8引擎执行JS.mdx';

export const metadata = pageMetadata["/http-browser/renderingProcess"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page