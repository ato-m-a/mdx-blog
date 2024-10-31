import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const theadCn =
  'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align-right]]:text-right';

const TableHeaderCell: Typography<HTMLTableCellElement> = ({ children, className, ...props }) => (
  <th className={cn(theadCn, className)} {...props}>
    {children}
  </th>
);
TableHeaderCell.className = theadCn;

export default TableHeaderCell;
