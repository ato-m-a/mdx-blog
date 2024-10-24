import type { FC, PropsWithChildren } from 'react';

const Description: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="color-secondary text-xl max-lg:text-header-md max-lg:leading-6 max-md:leading-5">
      {children}
    </p>
  );
};

export default Description;
