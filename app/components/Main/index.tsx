import type { FC, PropsWithChildren } from 'react';

const HomeMain: FC<PropsWithChildren> = ({ children }) => {
  return <main className="grid grid-cols-2 gap-16">{children}</main>;
};

export default HomeMain;
