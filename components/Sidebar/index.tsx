'use client';

import type { FC } from 'react';
import {
  Sidebar as SidebarCore,
  SidebarTrigger as SidebarTriggerCore,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/common/utils';
import { navigationDef, manageEntitiesDef } from './lib/menuDef';
import { Clock } from 'lucide-react';
import Protected from '@/components/lib/Protected';
import SidebarHeader from './SidebarHeader';
import SidebarGroup from './lib/SidebarGroup';
import MenuItem from './lib/MenuItem';
import SessionExpiryCounter from '@/components/SessionExpiryCounter';

export const Sidebar: FC = () => (
  <Protected>
    <SidebarCore className="border-sidebar-border">
      <SidebarHeader
        title="Welcome!"
        subtitle="Navigate & Manage Website"
        widget={
          <SessionExpiryCounter
            className="text-xs color-secondary font-codeblock"
            prefix={<Clock className="w-3 h-3" />}
          />
        }
      />
      <SidebarContent>
        <SidebarGroup label="Navigation">
          {navigationDef.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </SidebarGroup>
        <SidebarGroup label="Manage Entities">
          {manageEntitiesDef.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarCore>
  </Protected>
);

export const SidebarTrigger: FC = () => {
  const { open } = useSidebar();

  return (
    <Protected>
      <SidebarTriggerCore
        className={cn(
          'h-9 w-9 fixed top-4 left-4 [&_svg]:!w-5 [&_svg]:!h-5',
          open ? 'z-0' : 'z-10',
        )}
      />
    </Protected>
  );
};
