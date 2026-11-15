import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/02-nextjs-ssg-undefind-bug.mdx';

export const metadata = pageMetadata["/nextjs/ssgUndefinedBug"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
