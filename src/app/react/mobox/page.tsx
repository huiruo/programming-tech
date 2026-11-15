import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/库-redux-connect-useSelector.mdx';

export const metadata = pageMetadata["/react/mobox"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page