'use client';

import { useState, useEffect, type FC } from 'react';
import LoginDialog from '@/components/LoginDialog';

const CommandListener: FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey) {
      switch (event.key) {
        case 'l':
          setLoginDialogOpen(true);
          break;
      }
    }

    if (event.metaKey && event.key === 'l') setLoginDialogOpen(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
    </>
  );
};

export default CommandListener;
