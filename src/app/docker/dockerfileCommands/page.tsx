import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/3-Dockerfile命令.mdx';

export const metadata = pageMetadata["/docker/dockerfileCommands"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page