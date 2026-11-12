'use client';

import React, {
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Highlight, Language, themes } from 'prism-react-renderer';
import styles from './codeBlock.module.css';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
  code?: string;
}

type CopyStatus = 'idle' | 'copied' | 'error';

function getNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (React.isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return '';
}

function getLanguage(node: ReactNode): string | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const language = getLanguage(child);
      if (language) return language;
    }
    return undefined;
  }

  if (!React.isValidElement<{ className?: string; children?: ReactNode }>(node)) {
    return undefined;
  }

  const match = node.props.className?.match(/(?:lang|language)-([\w-]+)/);
  return match?.[1] ?? getLanguage(node.props.children);
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  code,
  className,
  style,
  ...preProps
}) => {
  const content = useMemo(
    () => (code ?? getNodeText(children)).replace(/\n$/, ''),
    [children, code],
  );
  const languageName = useMemo(() => getLanguage(children) ?? 'text', [children]);
  const language = languageName as Language;
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const resetTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyCode = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API is unavailable');
      await navigator.clipboard.writeText(content);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }

    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 1800);
  };

  const copyLabel = copyStatus === 'copied'
    ? '已复制'
    : copyStatus === 'error'
      ? '复制失败'
      : '复制';

  return (
    <div className={styles.codeBlock}>
      <div className={styles.toolbar}>
        <span className={styles.language}>{languageName}</span>
        <button
          className={styles.copyButton}
          type="button"
          onClick={copyCode}
          aria-label={`复制 ${languageName} 代码`}
          aria-live="polite"
        >
          {copyLabel}
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={content} language={language}>
        {({ className: prismClassName, style: prismStyle, tokens, getLineProps, getTokenProps }) => (
          <pre
            {...preProps}
            className={[styles.pre, prismClassName, className].filter(Boolean).join(' ')}
            style={{ ...prismStyle, ...style }}
          >
            <code>
              {tokens.map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  {...getLineProps({ line })}
                  className={styles.line}
                >
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default memo(CodeBlock);
