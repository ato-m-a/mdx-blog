import type { FC } from 'react';
import type { MDXComponents } from 'mdx/types';
import { MDXRemote as MDXRemoteCore, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import { Heading, Paragraph } from '@/components/ui/Typography';

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
        ...componentsOverride,
      }}
    />
  );
};

export default MDXRemote;
