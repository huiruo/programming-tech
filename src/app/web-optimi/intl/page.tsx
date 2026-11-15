import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/web-optimization/国际化.mdx';

export const metadata = pageMetadata["/web-optimi/intl"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page