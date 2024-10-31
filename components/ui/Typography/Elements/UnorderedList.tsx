import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const unorderedListCn = 'my-6 ml-6 list-disc [&>li]:mt-2';

const UnorderedList: Typography<HTMLUListElement> = ({ children, className, ...props }) => (
  <ul className={cn(unorderedListCn, className)} {...props}>
    {children}
  </ul>
);
UnorderedList.className = unorderedListCn;

export default UnorderedList;
