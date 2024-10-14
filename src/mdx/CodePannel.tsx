'use client';

import React from 'react';
import { usePathname } from 'next/navigation'
import { Editor } from '../components/editor';

export type Language = 'javascript' | 'html'

interface Props {
  code: string
  language?: Language
  height?: string
  name?: string
}

const CodePannel: React.FC<Props> = ({ code, height, name, language = 'javascript' }) => {
  const location = usePathname()

  return <Editor
    code={code}
    path={`${location}/${name}`}
    height={height}
    language={language}
  />
};

export default CodePannel;