import type { FC } from 'react';
import type { MDXComponents } from 'mdx/types';
import { MDXRemote as MDXRemoteCore, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import {
  Heading,
  Paragraph,
  Anchor,
  Blockquote,
  UnorderedList,
  ListItem,
  Table,
  TableWrapper,
  TableHeaderCell,
  TableDataCell,
} from '@/components/ui/Typography';

type MDXRemoteProps = {
  source: MDXRemoteSerializeResult | string;
  components?: MDXComponents;
};

const MDXRemote: FC<MDXRemoteProps> = ({ source, components: componentsOverride }) => {
  return (
    <MDXRemoteCore
      source={source}
      components={{
        h1: Heading.h1,
        h2: Heading.h2,
        h3: Heading.h3,
        p: Paragraph,
        a: Anchor,
        blockquote: Blockquote,
        ul: UnorderedList,
        li: ListItem,
        table: ({ children, ...props }) => (
          <TableWrapper {...props}>
            <Table>{children}</Table>
          </TableWrapper>
        ),
        th: TableHeaderCell,
        td: TableDataCell,
        ...componentsOverride,
      }}
    />
  );
};

export default MDXRemote;
