import type { Typography } from '@/components/ui/Typography/types';

const ListItem: Typography<HTMLLIElement> = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);
ListItem.className = 'mt-2';

export default ListItem;
