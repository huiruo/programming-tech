import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/web-optimization/1-react-vue.mdx';

export const metadata = pageMetadata["/web-optimi/react"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page