import type { FC } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import { cn } from '@/common/utils';
import Link from 'next/link';

const CardEmptyView: FC = () => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/manage/career/create"
          className={cn(
            'flex justify-center items-center cursor-pointer',
            'h-[318px] border-dashed border-divider border-base border-2 rounded-lg',
            'text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 hover:dark:text-zinc-500',
            'border-base hover:border-zinc-500',
            'transition-colors duration-200',
          )}
        >
          <Plus className="w-10 h-10" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>새로운 이력을 작성합니다.</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default CardEmptyView;
