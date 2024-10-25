import type { ElementType, ReactElement } from 'react';
import type { FlexibleComponentProps } from '@/components/types';

const HoverGroup = <E extends ElementType>({
  as,
  children,
  className,
  extend,
  ...props
}: FlexibleComponentProps<E>): ReactElement => {
  const Component = extend ?? as ?? 'a';

  return (
    <Component className="relative cursor-pointer w-fit" {...props}>
      <span className={`relative group ${className}`}>
        {children}
        <span
          className={`
            absolute left-0 bottom-0 
            w-full h-[1px] 
            bg-invert
            origin-left
            transform scale-x-0
            transition-transform duration-200 ease-out
            group-hover:scale-x-100
          `}
        />
      </span>
    </Component>
  );
};

export default HoverGroup;
