import type { FC, PropsWithChildren } from 'react';

const HomeMain: FC<PropsWithChildren> = ({ children }) => {
  return <main>{children}</main>;
};

export default HomeMain;
