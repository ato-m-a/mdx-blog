import type { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container custom-lg mx-auto p-16 min-h-screen flex-grow space-y-12 max-lg:px-12 max-md:px-8 max-md:py-12 max-sm:px-6 max-sm:py-8">
      {children}
    </div>
  );
};

export default Container;
