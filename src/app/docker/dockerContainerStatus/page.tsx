import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/5-获取docker容器运行状态.mdx';

export const metadata = pageMetadata["/docker/dockerContainerStatus"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page