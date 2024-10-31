import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const anchorCn = 'font-medium text-primary underline underline-offset-4';

const Anchor: Typography<HTMLAnchorElement> = ({ children, className, ...props }) => (
  <a className={cn(anchorCn, className)} {...props}>
    {children}
  </a>
);
Anchor.className = anchorCn;

export default Anchor;
