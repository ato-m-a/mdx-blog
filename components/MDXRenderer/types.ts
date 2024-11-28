import type { MDXComponents } from 'mdx/types';

export type MDXRendererProps = {
  components?: MDXComponents;
  source: string;
};
