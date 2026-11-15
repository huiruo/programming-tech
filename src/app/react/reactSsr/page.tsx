import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/jReactSSR.mdx';

export const metadata = pageMetadata["/react/reactSsr"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page