import type { SidebarGroupProps } from './types';
import type { FC } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup as SidebarGroupCore,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SidebarGroup: FC<SidebarGroupProps> = ({
  children,
  label,
  resourceName,
  defaultOpen,
  collapsible,
}) => {
  const pathname = usePathname();

  return (
    <Collapsible
      {...(collapsible
        ? {
            defaultOpen:
              typeof defaultOpen === 'function' ? defaultOpen(pathname) : pathname === resourceName,
          }
        : { disabled: true, open: true })}
    >
      <SidebarGroupCore>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger disabled={!collapsible}>
            {label}
            {collapsible && (
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            )}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>{children}</SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroupCore>
    </Collapsible>
  );
};

export default SidebarGroup;
