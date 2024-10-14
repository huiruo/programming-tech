import React, { memo, ReactElement, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement
  code?: string
}

const Mermaid: React.FC<MermaidProps> = ({ children, code = '' }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const content = children.props?.children?.props?.children || code

  useEffect(() => {
    if (chartRef.current) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [content]);

  return <div className="mermaid" ref={chartRef}>{content}</div>
};

export default memo(Mermaid, (prevProps, nextProps) => {
  // false will rerender
  return prevProps.children === nextProps.children;
});
