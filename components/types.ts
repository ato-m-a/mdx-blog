import type { ElementType, ComponentProps, ReactNode, Dispatch, SetStateAction } from 'react';

type FlexibleProps<E extends ElementType, T = object> = { as?: E } & T;

export type FlexibleComponentProps<E extends ElementType, T = object> = FlexibleProps<E, T> &
  Omit<ComponentProps<E>, keyof FlexibleProps<E>>;

export type EditableProps<T> = ({ edit: true } & T) | { edit?: false | undefined };

export type WithTrigger = { trigger: ReactNode };
export type WithWidget<T = undefined> = {
  widget?: T extends undefined ? ReactNode : (props: T) => JSX.Element;
};

export type SearchParams<T extends string> = { searchParams: { [key in T]?: string } };
export type Params<T extends string> = { params: { [key in T]?: string } };

export type StateTuples<T> = [T, Dispatch<SetStateAction<T>>];
