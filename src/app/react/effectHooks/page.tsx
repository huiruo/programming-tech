import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/react/useLayoutEffect-useEffect.mdx';

export const metadata = pageMetadata["/react/effectHooks"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page