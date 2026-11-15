import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/11-浏览器事件-冒泡-捕获.mdx';

export const metadata = pageMetadata["/http-browser/eventsBubblingCapture"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page