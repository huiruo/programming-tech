import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/http-browser/21-ServiceWorkers.mdx';

export const metadata = pageMetadata["/http-browser/serviceWorkers"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page