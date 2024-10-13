import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  color?: string
}

const HighlightText: React.FC<Props> = ({ children, color = 'red' }) => {
  return <span style={{ color }}>{children}</span>;
};

export default HighlightText;