import { createContext } from 'react';

type ObservedContextType = {
  cursor: number;
  setCursor: (cursor: number) => void;
  handleCursorChange: (callback: (cursor: number) => void) => void;
};

const ObservedContext = createContext<ObservedContextType>({
  cursor: 0,
  setCursor: () => {},
  handleCursorChange: () => {},
});

export default ObservedContext;
