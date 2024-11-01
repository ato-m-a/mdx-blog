import type { ElementType, ComponentProps, PropsWithChildren } from 'react';

type HoverGroupAsChildProps = PropsWithChildren<{
  asChild: true;
  as?: never;
  className?: never;
}>;
type HoverGroupAsProps<E extends ElementType> = {
  as?: E;
  asChild?: false | undefined;
} & Omit<ComponentProps<E>, 'as'>;

export type HoverGroupProps<E extends ElementType> = HoverGroupAsChildProps | HoverGroupAsProps<E>;
