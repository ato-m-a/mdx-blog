'use client';

import type { FC } from 'react';
import { useMarkdownEditorContext } from './context';
import MDXRenderer from '@/components/MDXRenderer/client';

const EditorPreview: FC = () => {
  const { source, isPreviewOpen } = useMarkdownEditorContext();

  if (!isPreviewOpen) return null;

  return (
    <div className="p-5 h-full bg-primary border-base border-l-[1px] basis-1/2 overflow-auto">
      <MDXRenderer source={source} debounce={500} />
    </div>
  );
};

export default EditorPreview;
