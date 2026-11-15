import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/ts/4-泛型-record.mdx';

export const metadata = pageMetadata["/ts/generics"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page