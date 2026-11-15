import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/4-DockerSwarm.mdx';

export const metadata = pageMetadata["/docker/dockerSwarm"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page