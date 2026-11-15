import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/01-浏览器请求-渲染的流程.mdx';

export const metadata = pageMetadata["/http-browser/webRenderingProcess"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page