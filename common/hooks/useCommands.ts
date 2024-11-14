import { useEffect } from 'react';

type KeyEvent = ((event: KeyboardEvent) => boolean) | string;
type KeysOrKey = ReadonlyArray<KeyEvent> | KeyEvent;

const useCommands = (keysOrKey: KeysOrKey, callback: () => void) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (keysOrKey instanceof Array) {
      for (const key of keysOrKey) {
        if (typeof key === 'function') {
          key(event);
        } else if ((event.metaKey || event.ctrlKey) && event.key === key) {
          callback();
          event.preventDefault();
        }
      }
    } else {
      if (typeof keysOrKey === 'function') {
        keysOrKey(event);
      } else if ((event.metaKey || event.ctrlKey) && event.key === keysOrKey) {
        callback();
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};

export default useCommands;
