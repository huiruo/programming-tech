import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/6-K8S基础.mdx';

export const metadata = pageMetadata["/docker/K8S"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page