import type { ReactNode } from 'react';

type SidebarGroupBaseProps = {
  children: ReactNode;
  label: string;
  collapsible?: boolean;
};

type CollapsibleGroupProps = {
  collapsible: true;
  resourceName: string;
  defaultOpen?: boolean | ((pathname: string) => boolean);
};

type NonCollapsibleGroupProps = {
  collapsible?: never;
  resourceName?: never;
  defaultOpen?: never;
};

export type SidebarGroupProps = SidebarGroupBaseProps &
  (CollapsibleGroupProps | NonCollapsibleGroupProps);
