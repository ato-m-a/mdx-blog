import type { MDXComponents } from 'mdx/types';
import { Paragraph, Heading } from '@/components/ui/Typography';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: Paragraph,
    h1: Heading.h1,
    h2: Heading.h2,
    h3: Heading.h3,
    ...components,
  };
}
