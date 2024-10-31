import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const tableCn = 'w-full';

const Table: Typography<HTMLTableElement> = ({ children, className, ...props }) => (
  <table className={cn(tableCn, className)} {...props}>
    {children}
  </table>
);
Table.className = tableCn;

export default Table;
