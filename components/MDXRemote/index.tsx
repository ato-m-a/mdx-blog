import type { FC } from 'react';
import type { MDXComponents } from 'mdx/types';
import { MDXRemote as MDXRemoteCore, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';
import { components } from './config';
import rehypePrismPlus from 'rehype-prism-plus';

type MDXRemoteProps = {
  source: MDXRemoteSerializeResult | string;
  components?: MDXComponents;
};

const MDXRemote: FC<MDXRemoteProps> = async ({ source, components: componentsOverride }) => {
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

export default MDXRemote;
