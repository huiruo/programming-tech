import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/docker/1-Docker_nginx_部署网站.mdx';

export const metadata = pageMetadata["/docker/docker_nginx"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page