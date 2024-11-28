'use client';

import { useState } from 'react';
import matter from 'gray-matter';

type UseMarkdownDefaultValues<T extends object> = {
  frontmatter?: T;
  content?: string;
};

const useMarkdown = <T extends object>({
  content: defaultContent = '',
  frontmatter: defaultFrontmatter,
}: UseMarkdownDefaultValues<T> = {}) => {
  const [source, setSource] = useState<string>(
    defaultFrontmatter ? matter.stringify(defaultContent, defaultFrontmatter) : defaultContent,
  );

  const content = {
    get: () => matter(source).content,
  };

  const frontmatter = {
    get: () => {
      const { data: matterData } = matter(source);
      return Object.keys(defaultFrontmatter ?? {}).reduce(
        (acc, key) => ({
          ...acc,
          [key]: matterData[key],
        }),
        {} as T,
      );
    },
    set: (setter: T | ((prev: T) => T)) => {
      if (typeof setter === 'function') {
        const prev = frontmatter.get();
        if (!prev) throw new Error('default frontmatter is not defined.');

        const newFrontmatter = setter(prev);
        if (!newFrontmatter) throw new Error('new frontmatter is not defined.');

        return setSource(matter.stringify(content.get(), newFrontmatter));
      }

      setSource(matter.stringify(content.get(), setter));
    },
  };

  return {
    source: { source, setSource } as const,
    frontmatter,
    content,
  };
};

export default useMarkdown;
