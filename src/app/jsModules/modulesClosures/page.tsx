import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsModules/03-模块化和闭包.mdx';

export const metadata = pageMetadata["/jsModules/modulesClosures"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page