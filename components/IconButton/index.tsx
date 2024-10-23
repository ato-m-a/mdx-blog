import type { AnchorHTMLAttributes, FC } from 'react';
import type { LucideIcon } from 'lucide-react';

type IconButtonProps = {
  Icon: LucideIcon;
  anchorProps: AnchorHTMLAttributes<HTMLAnchorElement>;
};

const IconButton: FC<IconButtonProps> = ({ Icon, anchorProps }) => {
  return (
    <a {...anchorProps}>
      <Icon
        className={`
          w-6 h-6 cursor-pointer duration-200
          transition-opacity dark:transition-colors
          text-zinc-600 dark:text-zinc-500
          dark:hover:text-zinc-100 dark:hover:opacity-100
          hover:opacity-60
        `}
      />
    </a>
  );
};

export default IconButton;
