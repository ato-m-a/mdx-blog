import type { ElementType, ComponentPropsWithoutRef, ReactElement, PropsWithChildren } from 'react';

type HoverGroupProps<E extends ElementType> = PropsWithChildren<
  { as?: E } & ComponentPropsWithoutRef<E>
>;

const HoverGroup = <E extends ElementType>({
  as,
  children,
  className,
  ...props
}: HoverGroupProps<E>): ReactElement => {
  const Component = as ?? 'p';

  return (
    <Component className={`relative cursor-pointer ${className}`} {...props}>
      <span className="relative group">
        {children}
        <span
          className={`
            absolute left-0 bottom-0 
            w-full h-[1px] 
            bg-primary
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
