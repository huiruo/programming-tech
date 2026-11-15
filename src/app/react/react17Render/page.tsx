import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/react17-render阶段.mdx';

export const metadata = pageMetadata["/react/react17Render"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page