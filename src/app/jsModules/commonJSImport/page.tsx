import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/jsModules/05-ESM和CommonJS-import引入差异.mdx';

export const metadata = pageMetadata["/jsModules/commonJSImport"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page