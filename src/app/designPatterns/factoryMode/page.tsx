import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/2-工厂模式.mdx';

export const metadata = pageMetadata["/designPatterns/factoryMode"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page