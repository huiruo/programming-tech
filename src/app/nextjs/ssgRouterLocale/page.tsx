import { pageMetadata } from "@/generated/pageMetadata";
import React from 'react';
import MdxComponent from '../../../mdx/Nextjs/03-ssg-useRouter-获取locale.mdx';

export const metadata = pageMetadata["/nextjs/ssgRouterLocale"];

const Page: React.FC = () => {
  return <MdxComponent />
};

export default Page
