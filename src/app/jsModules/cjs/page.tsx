import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsModules/02-cjs.mdx';

export const metadata = pageMetadata["/jsModules/cjs"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page