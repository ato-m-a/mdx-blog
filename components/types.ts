import type { ElementType, ComponentProps, ReactNode } from 'react';

type FlexibleProps<E extends ElementType, T = object> = { as?: E } & T;

export type FlexibleComponentProps<E extends ElementType, T = object> = FlexibleProps<E, T> &
  Omit<ComponentProps<E>, keyof FlexibleProps<E>>;

export type EditableProps<T> = ({ edit: true } & T) | { edit?: false | undefined };

export type WithTrigger = { trigger: ReactNode };

export type SearchParams<T extends string> = { searchParams: { [key in T]?: string } };
export type Params<T extends string> = { params: { [key in T]?: string } };
