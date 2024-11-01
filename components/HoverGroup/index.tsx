import type { HoverGroupProps } from './types';
import { isValidElement, type ElementType, type ReactElement } from 'react';
import { cn } from '@/common/utils';
import { Slot } from '@radix-ui/react-slot';

const Underline = () => (
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
);

const HoverGroup = <E extends ElementType>({
  children,
  as,
  asChild = false,
  className,
  ...props
}: HoverGroupProps<E>): ReactElement => {
  const Component = asChild ? Slot : (as ?? 'a');

  const combinedClassName = cn(
    'relative group cursor-pointer w-fit',
    asChild && isValidElement(children) ? children.props.className : className,
  );

  return (
    <Component {...props} className={combinedClassName}>
      <>
        {children}
        <Underline />
      </>
    </Component>
  );
};

export default HoverGroup;
