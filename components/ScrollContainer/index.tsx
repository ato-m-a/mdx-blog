'use client';

import type { FlexibleComponentProps } from '@/components/types';
import { useRef, useState, type ReactElement, type ElementType } from 'react';

const ScrollContainer = <E extends ElementType>({
  as,
  className,
  children,
  ...props
}: FlexibleComponentProps<E>): ReactElement => {
  const Component = as ?? 'div';
  const contentRef = useRef<HTMLDivElement>(null);

  const [showTopIndicator, setShowTopIndicator] = useState<boolean>(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState<boolean>(false);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setShowTopIndicator(scrollTop > 0);
      setShowBottomIndicator(scrollTop + clientHeight < scrollHeight - 1);
    }
  };

  return (
    <div className="relative flex-grow overflow-hidden px-6 py-0.5">
      <div
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background via-background/70 to-transparent pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: showTopIndicator ? 1 : 0 }}
        aria-hidden="true"
      />
      <Component className={className} ref={contentRef} onScroll={handleScroll} {...props}>
        {children}
      </Component>
      <div
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: showBottomIndicator ? 1 : 0 }}
        aria-hidden="true"
      />
    </div>
  );
};

export default ScrollContainer;
