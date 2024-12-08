'use client';

import type { FC } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { useMarkdownEditorContext } from './context';
import { Eye, Maximize } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/common/utils';

const EditorToolbar: FC = () => {
  const { isLoading, isPreviewOpen, setIsPreviewOpen, isMaximized, setIsMaximized, widget } =
    useMarkdownEditorContext();

  const togglePreview = () => setIsPreviewOpen((prev) => !prev);
  const toggleMaximize = () => setIsMaximized((prev) => !prev);

  if (isLoading) return <Skeleton className="w-full h-full" />;

  return (
    <div className="flex p-2 justify-between bg-primary items-center border-base border-b-[1px]">
      {widget}
      <div className={cn('flex items-center gap-1', !widget && 'ml-auto')}>
        <Toggle pressed={isPreviewOpen} onPressedChange={togglePreview}>
          <Eye className="w-4 h-4" />
          미리보기
        </Toggle>
        <Toggle pressed={isMaximized} onPressedChange={toggleMaximize}>
          <Maximize className="w-4 h-4" />
        </Toggle>
      </div>
    </div>
  );
};

export default EditorToolbar;
