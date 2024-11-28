import * as React from 'react';

import { cn } from '@/common/utils';

type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  rowsAutoIncrement?: boolean;
  enableTab?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, value, rows: _rows, rowsAutoIncrement, onChange, onKeyDown, enableTab, ...props },
    ref,
  ) => {
    const [rows, setRows] = React.useState<number | undefined>(_rows);
    React.useEffect(() => {
      if (rowsAutoIncrement) {
        const lines = value?.split('\n').length;
        setRows(Math.max(lines, _rows ?? 0));
      }
    }, [value, _rows, rowsAutoIncrement]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(e);
      if (e.key === 'Tab' && enableTab) {
        e.preventDefault();

        const textarea = e.target;
        if (textarea instanceof HTMLTextAreaElement && enableTab) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const newValue = value.slice(0, start) + '  ' + value.slice(end);
          onChange(newValue);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 2;
          }, 0);
        }
      }
    };

    return (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
          className,
        )}
        ref={ref}
        value={value}
        rows={rows}
        onKeyDown={handleKeyDown}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
