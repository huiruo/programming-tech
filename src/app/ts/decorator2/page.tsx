import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/ts/4-装饰器2.mdx';

export const metadata = pageMetadata["/ts/decorator2"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page