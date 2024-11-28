'use client';

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from 'react';

export type MarkdownEditorContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isMaximized: boolean;
  setIsMaximized: Dispatch<SetStateAction<boolean>>;
  isPreviewOpen: boolean;
  setIsPreviewOpen: Dispatch<SetStateAction<boolean>>;
  source: string;
  setSource: Dispatch<SetStateAction<string>>;
  widget?: ReactNode;
};

export const MarkdownEditorContext = createContext<MarkdownEditorContextType | null>(null);

export const useMarkdownEditorContext = () => {
  const context = useContext(MarkdownEditorContext);
  if (!context)
    throw new Error(
      'useMarkdownEditorContext must be used within a <MarkdownEditorContext.Provider />',
    );

  return context;
};
