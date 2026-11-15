import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/0-Docker基础.mdx';

export const metadata = pageMetadata["/docker/basics"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page