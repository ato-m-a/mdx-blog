import type { ElementType, ComponentProps } from 'react';

type FlexibleProps<E extends ElementType, T = object> = { as?: E } & T;

export type FlexibleComponentProps<E extends ElementType, T = object> = FlexibleProps<E, T> &
  Omit<ComponentProps<E>, keyof FlexibleProps<E>>;
