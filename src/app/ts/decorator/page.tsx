import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/ts/4-装饰器.mdx';

export const metadata = pageMetadata["/ts/decorator"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page