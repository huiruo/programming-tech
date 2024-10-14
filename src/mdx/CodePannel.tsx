'use client';

import React from 'react';
import { usePathname } from 'next/navigation'
export type Language = 'javascript' | 'html'
import dynamic from 'next/dynamic';
// import CodeEditor from '../components/editor';
export const CodeEditor = dynamic(() => import('../components/editor'), {
  ssr: false,
});

interface Props {
  code: string
  language?: Language
  height?: string
  name?: string
}

const CodePannel: React.FC<Props> = ({ code, height, name, language = 'javascript' }) => {
  const location = usePathname()

  return <CodeEditor
    code={code}
    path={`${location}/${name}`}
    height={height}
    language={language}
  />
};

export default CodePannel;