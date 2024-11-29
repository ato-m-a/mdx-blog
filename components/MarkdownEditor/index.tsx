'use client';

import { useState, type FC, type ReactNode } from 'react';
import { cn } from '@/common/utils';
import { MarkdownEditorContext, type MarkdownEditorContextType } from './context';
import useCommands from '@/common/hooks/useCommands';
import EditorCore from './EditorCore';
import EditorToolbar from './EditorToolbar';
import EditorPreview from './EditorPreview';

type MarkdownEditorProps = Pick<MarkdownEditorContextType, 'source' | 'setSource'> & {
  widget?: ReactNode;
  className?: string;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ source, setSource, widget, className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  useCommands('Escape', () => setIsMaximized(false), { enabled: isMaximized });

  return (
    <div
      className={cn(
        'overflow-hidden border-base rounded-lg flex flex-col',
        className,
        !isLoading && 'border-[1px] bg-white dark:bg-[#0d1117]',
        isMaximized && 'rounded-none h-screen fixed inset-0 z-20',
      )}
    >
      <MarkdownEditorContext.Provider
        value={{
          source,
          setSource,
          isLoading,
          setIsLoading,
          isMaximized,
          setIsMaximized,
          isPreviewOpen,
          setIsPreviewOpen,
          widget,
        }}
      >
        <EditorToolbar />
        <div className="flex flex-1 overflow-hidden">
          <EditorCore />
          <EditorPreview />
        </div>
      </MarkdownEditorContext.Provider>
    </div>
  );
};

export default MarkdownEditor;