import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/6-适配器模式.mdx';

export const metadata = pageMetadata["/designPatterns/adapterMode"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page