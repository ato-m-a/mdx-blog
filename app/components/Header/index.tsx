import type { PropsWithChildren, FC } from 'react';
import Name from './Name';
import Description from './Description';

interface IHomeHeader extends FC<PropsWithChildren> {
  Name: typeof Name;
  Description: typeof Description;
}

const HomeHeader: IHomeHeader = ({ children }) => {
  return <header className="flex flex-col gap-4">{children}</header>;
};

HomeHeader.Name = Name;
HomeHeader.Description = Description;

export default HomeHeader;
