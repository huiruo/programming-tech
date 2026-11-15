import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/9-策略模式.mdx';

export const metadata = pageMetadata["/designPatterns/strategyMode"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page