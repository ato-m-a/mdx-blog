import type { Typography } from '@/components/ui/Typography/types';
import { cn } from '@/common/utils';

const tableWrapperCn = 'my-6 w-full overflow-y-auto';

const TableWrapper: Typography<HTMLDivElement> = ({ children, className, ...props }) => (
  <div className={cn(tableWrapperCn, className)} {...props}>
    {children}
  </div>
);
TableWrapper.className = tableWrapperCn;

export default TableWrapper;
