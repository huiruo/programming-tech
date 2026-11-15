import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsModules/01-esm.mdx';

export const metadata = pageMetadata["/jsModules/esm"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page