import type { FC } from 'react';

export type MenuItemOptions = {
  href: string;
  Icon: FC;
  label: string;
  subItems?: Array<Omit<MenuItemOptions, 'Icon' | 'subItems'> & { Icon?: FC }>;
};
