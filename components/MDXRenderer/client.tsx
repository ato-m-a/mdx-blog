'use client';

import type { MDXRendererProps } from './types';
import type { MDXModule } from 'mdx/types';
import { useState, useEffect, type FC } from 'react';
import { evaluate } from '@mdx-js/mdx';
import { components } from './config';
import runtime from 'react/jsx-runtime';
import useDebounce from '@/common/hooks/useDebounce';
import matter from 'gray-matter';
import rehypePrismPlus from 'rehype-prism-plus';

type ClientRendererProps = MDXRendererProps & {
  debounce?: number;
  enabled?: boolean;
};

const MDXRenderer: FC<ClientRendererProps> = ({
  source,
  components: componentsOverride,
  debounce = 0,
  enabled = true,
}) => {
  const debouncedSource = useDebounce(source, debounce);

  const [mdxModule, setMdxModule] = useState<MDXModule | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const compile = async () => {
      if (!enabled) return setMdxModule(null);

      try {
        const { content } = matter(debouncedSource);

        const evaluated = await evaluate(content, {
          ...runtime,
          rehypePlugins: [
            [
              rehypePrismPlus,
              {
                showLineNumbers: true,
                highlightLines: true,
              },
            ],
          ],
        });

        setMdxModule(evaluated);
      } catch (error) {
        setError(error as Error);
      }
    };

    compile();
  }, [enabled, debouncedSource]);

  if (!mdxModule) return null;
  if (error) return <>{error.message}</>;

  return <mdxModule.default components={{ ...components, ...componentsOverride }} />;
};

export default MDXRenderer;
