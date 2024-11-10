import { useEffect } from 'react';

type Keys = ReadonlyArray<((event: KeyboardEvent) => boolean) | string>;

const useCommands = (keyArray: Keys, callback: () => void) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    for (const key of keyArray) {
      if (typeof key === 'function') {
        key(event);
      } else if (event.metaKey && event.key === key) {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};

export default useCommands;
