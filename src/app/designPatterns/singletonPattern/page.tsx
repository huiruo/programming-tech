import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/1-单例模式.mdx';

export const metadata = pageMetadata["/designPatterns/singletonPattern"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page