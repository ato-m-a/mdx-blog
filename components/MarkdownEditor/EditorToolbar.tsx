'use client';

import type { FC } from 'react';
import { useMarkdownEditorContext } from './context';
import { Eye, Maximize } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/common/utils';

const EditorToolbar: FC = () => {
  const { isLoading, isPreviewOpen, setIsPreviewOpen, isMaximized, setIsMaximized, widget } =
    useMarkdownEditorContext();

  if (isLoading) return <Skeleton className="w-full h-full" />;

  return (
    <div className="flex p-2 justify-between bg-primary items-center border-base border-b-[1px]">
      {widget}
      <div className={cn('flex items-center gap-1', !widget && 'ml-auto')}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPreviewOpen((prev) => !prev)}
          active={isPreviewOpen}
        >
          <Eye className="w-4 h-4" />
          미리보기
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMaximized((prev) => !prev)}
          active={isMaximized}
        >
          <Maximize className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
