'use client';

import React, { memo, ReactElement } from 'react';
import { Highlight, Language, themes } from 'prism-react-renderer';

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement
  code?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, code = '' }) => {

  const content = children.props?.children?.props?.children || code
  const language = children.props?.children?.props?.className.replace(/language-/, '') as Language || 'js';

  return (
    <Highlight
      theme={themes.vsDark}
      code={content}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style, padding: '1rem 1rem 0 1rem', boxSizing: 'border-box' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {/* <span>{i + 1}</span> */}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default memo(CodeBlock, (prevProps, nextProps) => {
  // false will rerender
  return prevProps.children === nextProps.children;
});
