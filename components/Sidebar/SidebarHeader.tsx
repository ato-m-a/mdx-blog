import type { WithWidget } from '@/components/types';
import { useEffect, useState, type FC } from 'react';
import {
  SidebarHeader as SidebarHeaderCore,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { CommandShortcut } from '@/components/ui/command';
import { cn } from '@/common/utils';
import CommandItem from '@/components/CommandItem';

type SidebarHeaderProps = {
  className?: string;
  title: string;
  subtitle: string;
} & WithWidget;

const SidebarHeader: FC<SidebarHeaderProps> = ({ className, title, subtitle, widget }) => {
  const { open, setOpen } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    if (!open) setDropdownOpen(false);
  }, [open]);

  return (
    <SidebarHeaderCore>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                className={cn('relative flex flex-col items-start gap-1 h-fit', className)}
              >
                <h1 className="text-xl color-primary font-bold">{title}</h1>
                <p className="text-sm color-secondary">{subtitle}</p>
                {widget}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              className="w-[--radix-popper-anchor-width] !bg-primary"
            >
              <CommandItem.logout onSuccess={closeDropdown} onError={closeDropdown} />
              <CommandItem.extendSession onSuccess={closeDropdown} onError={closeDropdown} />
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(false)}>
                사이드바 닫기
                <CommandShortcut>⌘B</CommandShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderCore>
  );
};

export default SidebarHeader;
