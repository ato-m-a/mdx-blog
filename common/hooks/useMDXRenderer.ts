'use client';

import type { MDXModule } from 'mdx/types';
import { useState, useEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import runtime from 'react/jsx-runtime';
import rehypePrismPlus from 'rehype-prism-plus';
import useDebounce from './useDebounce';
import matter from 'gray-matter';

export type UseMDXRendererOptions = {
  debounce?: number;
  enabled?: boolean;
};

const useMDXRenderer = (_source: string, options?: UseMDXRendererOptions) => {
  const { debounce = 0, enabled = true } = options || {};
  const source = useDebounce(_source, debounce);

  const [mdxModule, setMdxModule] = useState<MDXModule | null>(null);
  const [frontmatter, setFrontmatter] = useState<object>({});
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const compile = async () => {
      if (!enabled) return setMdxModule(null);

      try {
        const parsed = matter(source);

        setFrontmatter(parsed.data);
        setContent(parsed.content);

        const evaluated = await evaluate(parsed.content, {
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
  }, [enabled, source]);

  const MDXRenderer = mdxModule?.default;

  return { MDXRenderer, frontmatter, content, error };
};

export default useMDXRenderer;
