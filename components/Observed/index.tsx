import type { FlexibleComponentProps } from '@/components/types';
import {
  useState,
  useEffect,
  useContext,
  useRef,
  type ElementType,
  type ReactElement,
} from 'react';
import { cn } from '@/common/utils';
import ObservedContext from './context';

type ObservedProps<E extends ElementType> = FlexibleComponentProps<E> & { initialCursor?: number };

/**
 * Observed의 클라이언트 컴포넌트 입니다.
 */
const Observed = <E extends ElementType>({
  as,
  children,
  className,
  initialCursor,
  ...props
}: ObservedProps<E>): ReactElement => {
  'use client';

  const Component = as ?? 'section';

  const [cursor, setCursor] = useState<number>(initialCursor ?? 0);
  const onCursorChange = useRef<((cursor: number) => void) | null>(null);
  const handleCursorChange = (callback: (cursor: number) => void) => {
    onCursorChange.current = callback;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          if (element instanceof HTMLElement && entry.isIntersecting) {
            setCursor(parseInt(element.dataset.index ?? '0'));
          }
        });
      },
      { threshold: 0.35 },
    );

    const targets = document.querySelectorAll('[data-index]');
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (onCursorChange.current) onCursorChange.current(cursor);

    const element = document.querySelector(`[data-index="${cursor}"]`);

    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, [cursor]);

  return (
    <Component {...props} className={cn(className)}>
      <ObservedContext.Provider
        value={{
          cursor,
          setCursor,
          handleCursorChange,
        }}
      >
        {children}
      </ObservedContext.Provider>
    </Component>
  );
};

Observed.consumer = ObservedContext.Consumer;
Observed.useContext = () => useContext(ObservedContext);

export default Observed;
