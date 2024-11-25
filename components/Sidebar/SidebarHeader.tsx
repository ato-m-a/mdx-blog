import { useEffect, useState, type FC, type ReactNode } from 'react';
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
import toast from '@/common/utils/toast';
import useCommands from '@/common/hooks/useCommands';
import useExtendSession from '@/common/hooks/session/useExtendSession';
import useLogout from '@/common/hooks/session/useLogout';

type SidebarHeaderProps = {
  className?: string;
  title: string;
  subtitle: string;
  widget?: ReactNode;
};

const SidebarHeader: FC<SidebarHeaderProps> = ({ className, title, subtitle, widget }) => {
  const { open, setOpen } = useSidebar();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const logout = useLogout({
    onSuccess: () => {
      setDropdownOpen(false);
      toast.logout_success();
    },
    onError: () => {
      setDropdownOpen(false);
      toast.logout_failed();
    },
  });

  const extend = useExtendSession({
    onSuccess: () => {
      setDropdownOpen(false);
      toast.extend_success();
    },
    onError: () => {
      setDropdownOpen(false);
      toast.extend_failed();
    },
  });

  useEffect(() => {
    if (!open) setDropdownOpen(false);
  }, [open]);

  useCommands('o', () => logout(), { enabled: dropdownOpen });
  useCommands('e', () => extend(), { enabled: dropdownOpen });

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
              <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
                Logout
                <CommandShortcut>⌘O</CommandShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => extend()}>
                Extend Session
                <CommandShortcut>⌘E</CommandShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(false)}>
                Close Sidebar
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
