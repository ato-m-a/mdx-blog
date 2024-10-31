import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const tableDataCellCn =
  'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right';

const TableDataCell: Typography<HTMLTableCellElement> = ({ children, className, ...props }) => (
  <td className={cn(tableDataCellCn, className)} {...props}>
    {children}
  </td>
);
TableDataCell.className = tableDataCellCn;

export default TableDataCell;
