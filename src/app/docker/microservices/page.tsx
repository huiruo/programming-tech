import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/10-微服务.mdx';

export const metadata = pageMetadata["/docker/microservices"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page