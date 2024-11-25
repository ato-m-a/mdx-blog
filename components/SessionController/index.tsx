'use client';

import type { ButtonProps } from '@/components/ui/button';
import { useState, type FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { ActionItems } from '@/components/DropdownItem';
import { cn } from '@/common/utils';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import Protected from '@/components/Protected';
import SessionExpiryCounter from '@/components/SessionExpiryCounter';

type SessionControllerProps = Pick<ButtonProps, 'variant' | 'className'>;

const SessionController: FC<SessionControllerProps> = ({ variant = 'ghost', className }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <Protected>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Button variant={variant} className={cn('cursor-pointer', className)} asChild>
              <SessionExpiryCounter
                className="text-xs color-secondary font-codeblock"
                prefix={<Clock className="w-3 h-3" />}
              />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-44 right-0 !bg-primary">
          <ActionItems.logout onSuccess={closeDropdown} onError={closeDropdown} />
          <ActionItems.extendSession onSuccess={closeDropdown} onError={closeDropdown} />
        </DropdownMenuContent>
      </DropdownMenu>
    </Protected>
  );
};

export default SessionController;
