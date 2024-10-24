import type { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export type FlexibleComponentProps<E extends ElementType> = PropsWithChildren<
  { as?: E } & ComponentPropsWithoutRef<E>
>;
