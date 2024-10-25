import type { FC, PropsWithChildren, HTMLAttributes } from 'react';

export type Props<T extends HTMLElement> = PropsWithChildren<HTMLAttributes<T>>;
export interface Typography<T extends HTMLElement> extends FC<Props<T>> {
  className: string;
}

export type HeadingTags = 'h1' | 'h2' | 'h3';
