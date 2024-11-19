import type { MDXComponents } from 'mdx/types';
import {
  Heading,
  Paragraph,
  Anchor,
  Code,
  Blockquote,
  UnorderedList,
  ListItem,
  Table,
  TableWrapper,
  TableHeaderCell,
  TableDataCell,
} from '@/components/ui/Typography';

export const components: MDXComponents = {
  h1: Heading.h1,
  h2: Heading.h2,
  h3: Heading.h3,
  p: Paragraph,
  a: Anchor,
  blockquote: Blockquote,
  code: Code,
  ul: UnorderedList,
  li: ListItem,
  table: ({ children, ...props }) => (
    <TableWrapper {...props}>
      <Table>{children}</Table>
    </TableWrapper>
  ),
  th: TableHeaderCell,
  td: TableDataCell,
} as const;
