import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const codeCn =
  'not-prose not-in-pre:font-codeblock not-in-pre:text-sm not-in-pre:rounded not-in-pre:px-1 not-in-pre:py-[0.1rem] not-in-pre:bg-zinc-200 not-in-pre:text-zinc-500 dark:not-in-pre:bg-zinc-800 dark:not-in-pre:text-zinc-400';

const Code: Typography<HTMLPreElement> = ({ children, className, ...props }) => (
  <code className={cn(codeCn, className)} {...props}>
    {children}
  </code>
);
Code.className = codeCn;

export default Code;
