import type { FC, PropsWithChildren } from 'react';

const Description: FC<PropsWithChildren> = ({ children }) => {
  return <p className="color-secondary text-xl">{children}</p>;
};

export default Description;
