import { fromEvent, type Observable } from 'rxjs';
import { share } from 'rxjs/operators';

const keyboardEventListener: Observable<KeyboardEvent> | null =
  typeof document !== 'undefined'
    ? fromEvent<KeyboardEvent>(document, 'keydown').pipe(share())
    : null;

export default keyboardEventListener;
