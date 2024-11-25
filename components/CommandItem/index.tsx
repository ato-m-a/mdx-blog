'use client';

import type { FC } from 'react';
import type { MutationOptions } from '@/common/hooks/session/types';
import { cn } from '@/common/utils';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CommandShortcut } from '@/components/ui/command';
import useCommands from '@/common/hooks/useCommands';
import useLogout from '@/common/hooks/session/useLogout';
import useExtendSession from '@/common/hooks/session/useExtendSession';

type CreateCommandItemOptions = {
  label: string;
  shortcut: string | string[];
  useActionHook: (options: MutationOptions) => () => void;
};
type CommandItemProps = MutationOptions & { className?: string; enabled?: boolean };
type CommandItem = FC<CommandItemProps>;
type CommandItemRecord = Readonly<Record<string, CommandItem>>;

const mergeClassName = (className?: string) => cn('cursor-pointer', className);

/**
 * 액션 아이템을 생성하는 팩토리 함수
 * @param label - 드롭다운 메뉴에 표시될 텍스트
 * @param shortcut - 키보드 단축키 텍스트
 * @param useActionHook - 액션을 수행하는 커스텀 훅
 * @returns DropdownItem 컴포넌트
 */
const createCommandItem = ({
  label,
  shortcut,
  useActionHook,
}: CreateCommandItemOptions): CommandItem => {
  const Result: CommandItem = ({ onSuccess, onError, className, enabled = true }) => {
    const action = useActionHook({ onSuccess, onError });
    useCommands(shortcut, () => action(), { enabled });

    return (
      <DropdownMenuItem className={mergeClassName(className)} onClick={() => action()}>
        {label}
        <CommandShortcut className="capitalize">
          ⌘{typeof shortcut === 'string' ? shortcut : shortcut.join('+')}
        </CommandShortcut>
      </DropdownMenuItem>
    );
  };

  return Result;
};

const CommandItem: CommandItemRecord = {
  logout: createCommandItem({
    label: '로그아웃',
    shortcut: 'o',
    useActionHook: useLogout,
  }),
  extendSession: createCommandItem({
    label: '세션 연장',
    shortcut: 'e',
    useActionHook: useExtendSession,
  }),
} as const;

export default CommandItem;
