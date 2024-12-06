import type { ElementType, ReactElement } from 'react';
import type { FlexibleComponentProps } from '@/components/types';
import { cn } from '@/common/utils';

const Container = <T extends ElementType>({
  children,
  className,
  as,
  ...props
}: FlexibleComponentProps<T>): ReactElement => {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'container relative custom-lg mx-auto p-16 min-h-screen flex-grow max-lg:px-12 max-md:px-8 max-md:py-12 max-sm:px-6 max-sm:py-8',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
