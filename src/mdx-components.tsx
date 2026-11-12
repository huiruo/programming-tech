import type { ComponentPropsWithoutRef, ElementType } from 'react';
import CodeBlock from '@/components/codeBlock';

type MdxComponentMap = Record<string, ElementType>;

function MdxTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div
      className="mdx-table-scroll"
      role="region"
      aria-label="数据表格"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  );
}

export function useMDXComponents(components: MdxComponentMap = {}): MdxComponentMap {
  return {
    pre: CodeBlock,
    table: MdxTable,
    ...components,
  };
}
