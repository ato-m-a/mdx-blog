import type { ElementType, ComponentPropsWithoutRef, ReactElement, PropsWithChildren } from 'react';

type FlexibleElementProps<E extends ElementType> = { as?: E } & ComponentPropsWithoutRef<E>;
type ParagraphProps<E extends ElementType> = PropsWithChildren<{
  hoverAnimation?: boolean;
}> &
  FlexibleElementProps<E>;

const Paragraph = <E extends ElementType>({
  as,
  children,
  hoverAnimation,
  className,
  ...props
}: ParagraphProps<E>): ReactElement => {
  const Component = as ?? 'p';
  const cn = `${className} ${hoverAnimation ? `relative cursor-pointer` : ''} w-fit`;

  return (
    <Component className={cn} {...props}>
      {hoverAnimation ? (
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
      ) : (
        children
      )}
    </Component>
  );
};

export default Paragraph;
