import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const tableRowCn = 'm-0 border-t p-0 even:bg-muted';

const TableRow: Typography<HTMLTableRowElement> = ({ children, className, ...props }) => (
  <tr className={cn(tableRowCn, className)} {...props}>
    {children}
  </tr>
);

TableRow.className = tableRowCn;

export default TableRow;
