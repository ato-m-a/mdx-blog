'use client';

import type { FC } from 'react';
import type { MutationOptions } from '@/common/hooks/session/types';
import { cn } from '@/common/utils';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CommandShortcut } from '@/components/ui/command';
import useLogout from '@/common/hooks/session/useLogout';
import useExtendSession from '@/common/hooks/session/useExtendSession';

type DropdownItemProps = MutationOptions & { className?: string };
type DropdownItem = FC<DropdownItemProps>;
type DropdownItemRecord = Readonly<Record<string, DropdownItem>>;

const mergeClassName = (className?: string) => cn('cursor-pointer', className);

const Logout: DropdownItem = ({ onSuccess, onError, className }) => {
  const logout = useLogout({ onSuccess, onError });

  return (
    <DropdownMenuItem className={mergeClassName(className)} onClick={() => logout()}>
      로그아웃
      <CommandShortcut>⌘O</CommandShortcut>
    </DropdownMenuItem>
  );
};

const ExtendSession: DropdownItem = ({ onSuccess, onError, className }) => {
  const extendSession = useExtendSession({ onSuccess, onError });

  return (
    <DropdownMenuItem className={mergeClassName(className)} onClick={() => extendSession()}>
      세션 연장
      <CommandShortcut>⌘E</CommandShortcut>
    </DropdownMenuItem>
  );
};

export const ActionItems: DropdownItemRecord = {
  logout: Logout,
  extendSession: ExtendSession,
} as const;
