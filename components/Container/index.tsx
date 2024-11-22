import type { FC, HTMLAttributes } from 'react';
import { cn } from '@/common/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'container relative custom-lg mx-auto p-16 min-h-screen flex-grow max-lg:px-12 max-md:px-8 max-md:py-12 max-sm:px-6 max-sm:py-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
