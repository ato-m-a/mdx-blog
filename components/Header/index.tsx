import type { FC } from 'react';
import type { WithWidget } from '@/components/types';
import Breadcrumb, { type BreadcrumbProps } from '@/components/Breadcrumb';
import ThemeToggleButton from '@/components/ThemeToggleButton';

type HeaderProps = BreadcrumbProps & {
  title: string;
  subtitle?: string;
} & WithWidget;

const Header: FC<HeaderProps> = ({ pathMap, title, subtitle, widget }) => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Breadcrumb pathMap={pathMap} />
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <h2 className="text-sm color-secondary">{subtitle}</h2>}
      </div>
      <div className="flex items-center gap-2">
        {widget}
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
