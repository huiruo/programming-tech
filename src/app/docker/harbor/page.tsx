import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/9-Harbor.mdx';

export const metadata = pageMetadata["/docker/harbor"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page