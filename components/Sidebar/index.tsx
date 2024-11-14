'use client';

import type { FC } from 'react';
import {
  Sidebar as SidebarCore,
  SidebarTrigger as SidebarTriggerCore,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/common/utils';
import Protected from '@/components/lib/Protected';

export const Sidebar: FC = () => {
  return (
    <Protected>
      <SidebarCore className="border-sidebar-border">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
        <SidebarRail />
      </SidebarCore>
    </Protected>
  );
};

export const SidebarTrigger: FC = () => {
  const { open } = useSidebar();

  return (
    <Protected>
      <SidebarTriggerCore
        className={cn(
          'h-9 w-9 absolute top-4 left-4 [&_svg]:!w-5 [&_svg]:!h-5',
          open ? 'z-0' : 'z-10',
        )}
      />
    </Protected>
  );
};
