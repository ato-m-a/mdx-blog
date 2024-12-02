import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import keyboardEventListener from '@/common/events/keyboard.event';

type Keys = ReadonlyArray<string>;
type Options = {
  enabled?: boolean;
  coerceMetaKey?: boolean;
};

const useCommands = (
  keys: Keys,
  callback: () => void,
  { enabled = true, coerceMetaKey = true }: Options = {},
) => {
  useEffect(() => {
    if (!keyboardEventListener) return;

    const subscription: Subscription = keyboardEventListener
      .pipe(
        filter(() => enabled),
        tap((event) => {
          keys.forEach((key) => {
            const metaTriggered = coerceMetaKey ? event.metaKey || event.ctrlKey : true;

            if (metaTriggered && event.key === key) {
              callback();
              event.preventDefault();
            }
          });
        }),
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [keys, callback, enabled, coerceMetaKey]);
};

export default useCommands;
