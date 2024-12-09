'use client';

import { useContext } from 'react';
import FormContext from '../context';

const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a <FormContext.Provider />');
  }

  return context;
};

export default useFormContext;
