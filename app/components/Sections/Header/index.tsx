import type { PropsWithChildren, FC } from 'react';
import Name from './Name';
import Description from './Description';

interface IHeaderSection extends FC<PropsWithChildren> {
  Name: typeof Name;
  Description: typeof Description;
}

const HeaderSection: IHeaderSection = ({ children }) => {
  return <header className="flex flex-col gap-4">{children}</header>;
};

HeaderSection.Name = Name;
HeaderSection.Description = Description;

export default HeaderSection;
