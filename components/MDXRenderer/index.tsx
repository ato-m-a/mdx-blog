import type { FC } from 'react';
import type { MDXRendererProps } from '@/components/MDXRenderer/types';
import { components } from '@/components/MDXRenderer/config';
import { MDXRemote as MDXRemoteCore } from 'next-mdx-remote/rsc';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeRewrite from 'rehype-rewrite';
import nestedParagraphRewrite from './rehypePlugins/nestedParagraphRewrite';

const MDXRenderer: FC<MDXRendererProps> = ({ source, components: componentsOverride }) => {
  return (
    <MDXRemoteCore
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrismPlus,
              {
                showLineNumbers: true,
                highlightLines: true,
              },
            ],
            [
              rehypeRewrite,
              {
                rewrite: nestedParagraphRewrite,
              },
            ],
          ],
        },
      }}
      components={{
        ...components,
        ...componentsOverride,
      }}
    />
  );
};

export default MDXRenderer;
