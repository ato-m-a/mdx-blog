'use client';

import type { WithWidget } from '@/components/types';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type MarkdownEditorContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isMaximized: boolean;
  setIsMaximized: Dispatch<SetStateAction<boolean>>;
  isPreviewOpen: boolean;
  setIsPreviewOpen: Dispatch<SetStateAction<boolean>>;
  source: string;
  setSource: Dispatch<SetStateAction<string>>;
} & WithWidget;

export const MarkdownEditorContext = createContext<MarkdownEditorContextType | null>(null);

export const useMarkdownEditorContext = () => {
  const context = useContext(MarkdownEditorContext);
  if (!context)
    throw new Error(
      'useMarkdownEditorContext must be used within a <MarkdownEditorContext.Provider />',
    );

  return context;
};
