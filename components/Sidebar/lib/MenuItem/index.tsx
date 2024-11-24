import { useMemo, type FC } from 'react';
import type { MenuItemOptions } from '../types';
import { usePathname } from 'next/navigation';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const MenuItem: FC<MenuItemOptions> = ({ href, Icon, label, subItems }) => {
  const pathname = usePathname();

  const isActive = useMemo<boolean>(() => {
    const isRootPage = href === '/';
    const isManagementPage = pathname.startsWith('/manage');

    if (isRootPage) return pathname === '/';
    if (isManagementPage) return pathname.includes(href);
    return pathname === href;
  }, [href, pathname]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={href}>
          <Icon />
          {label}
        </Link>
      </SidebarMenuButton>
      {subItems && subItems.length > 0 && (
        <SidebarMenuSub>
          {subItems.map((subItem) => (
            <SidebarMenuSubItem key={`sidebar-menu-sub-${subItem.label}`}>
              <SidebarMenuSubButton asChild>
                <Link href={subItem.href}>
                  {subItem.Icon && <subItem.Icon />}
                  {subItem.label}
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
};

export default MenuItem;
