import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/5-装饰器模式.mdx';

export const metadata = pageMetadata["/designPatterns/decoratorPattern"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page