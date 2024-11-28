'use client';

import type { FC } from 'react';
import { useTheme } from 'next-themes';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useMarkdownEditorContext } from './context';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { cn } from '@/common/utils';
import CodeMirror from '@uiw/react-codemirror';

const EditorCore: FC = () => {
  const { theme } = useTheme();
  const { source, setSource, isPreviewOpen, setIsLoading } = useMarkdownEditorContext();

  return (
    <div className={cn('overflow-auto', isPreviewOpen ? 'w-1/2' : 'flex-1')}>
      <CodeMirror
        className="text-sm [&_*]:!font-codeblock selection:text-zinc-900 dark:selection:text-zinc-100 dark:[&_.cm-gutters]:bg-zinc-900"
        value={source}
        onChange={setSource}
        theme={theme === 'dark' ? githubDark : githubLight}
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        onCreateEditor={() => setIsLoading(false)}
      />
    </div>
  );
};

export default EditorCore;
