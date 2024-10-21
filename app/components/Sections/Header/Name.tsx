import type { FC, PropsWithChildren } from 'react';

const Name: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-7xl color-primary font-bold tracking-widest">{children}</h1>;
};

export default Name;
