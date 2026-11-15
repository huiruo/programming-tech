import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/A-game-项目总结.mdx';

export const metadata = pageMetadata["/nextjs/aGameSummary"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
