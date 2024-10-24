import type { ElementType, ComponentType, ComponentProps } from 'react';

type FlexibleProps<E extends ElementType | ComponentType<unknown>> =
  | {
      as?: E;
      extend?: never;
    }
  | {
      as?: never;
      extend: E;
    };

export type FlexibleComponentProps<E extends ElementType> = FlexibleProps<E> &
  Omit<ComponentProps<E>, keyof FlexibleProps<E>>;
