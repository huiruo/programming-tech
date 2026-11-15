import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/getStaticProps.mdx';

export const metadata = pageMetadata["/nextjs/getStaticProps"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
