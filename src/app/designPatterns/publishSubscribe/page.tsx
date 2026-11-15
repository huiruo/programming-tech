import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/design-patterns/3-发布订阅模式-或观察者模式.mdx';

export const metadata = pageMetadata["/designPatterns/publishSubscribe"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page