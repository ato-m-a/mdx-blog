import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const paragraphCn = 'leading-7 text-base [&:not(:first-child)]:mt-6';

const Paragraph: Typography<HTMLParagraphElement> = ({ children, className, ...props }) => (
  <p className={cn(paragraphCn, className)} {...props}>
    {children}
  </p>
);
Paragraph.className = paragraphCn;

export default Paragraph;
