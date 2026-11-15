import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsModules/04-cjs-esm-模块差异.mdx';

export const metadata = pageMetadata["/jsModules/cjsEsm"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page