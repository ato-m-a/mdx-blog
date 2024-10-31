import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const blockquoteCn = 'mt-6 border-l-2 border-base pl-6 italic';

const Blockquote: Typography<HTMLQuoteElement> = ({ children, className, ...props }) => (
  <blockquote className={cn(blockquoteCn, className)} {...props}>
    {children}
  </blockquote>
);
Blockquote.className = blockquoteCn;

export default Blockquote;
