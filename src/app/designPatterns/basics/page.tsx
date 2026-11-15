import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/0-design-patterns.mdx';

export const metadata = pageMetadata["/designPatterns/basics"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page