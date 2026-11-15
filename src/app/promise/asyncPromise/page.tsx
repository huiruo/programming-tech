import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/promise/j8AsyncPromise.mdx';

export const metadata = pageMetadata["/promise/asyncPromise"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
