import type { AnchorHTMLAttributes, FC } from 'react';
import type { LucideIcon } from 'lucide-react';

type IconButtonProps = {
  Icon: LucideIcon;
  anchorProps: AnchorHTMLAttributes<HTMLAnchorElement>;
};

const IconButton: FC<IconButtonProps> = ({ Icon, anchorProps }) => {
  return (
    <a {...anchorProps}>
      <Icon className="w-6 h-6 cursor-pointer transition-opacity dark:transition-colors duration-200 text-zinc-600 dark:text-zinc-500 hover:opacity-60 hover:dark:text-zinc-100" />
    </a>
  );
};

export default IconButton;
