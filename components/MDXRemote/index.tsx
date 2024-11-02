import type { FC } from 'react';
import type { MDXComponents } from 'mdx/types';
import { MDXRemote as MDXRemoteCore, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import { components } from './config';

type MDXRemoteProps = {
  source: MDXRemoteSerializeResult | string;
  components?: MDXComponents;
};

const MDXRemote: FC<MDXRemoteProps> = ({ source, components: componentsOverride }) => (
  <MDXRemoteCore
    source={source}
    components={{
      ...components,
      ...componentsOverride,
    }}
  />
);

export default MDXRemote;
