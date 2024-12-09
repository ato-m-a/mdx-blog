import type { CreateCareerRequestSchema } from '@/schema/company/request.schema';
import type { UseFormReturn } from 'react-hook-form';
import { createContext } from 'react';

export type FormContextType = UseFormReturn<CreateCareerRequestSchema> & {
  isUpdate: boolean;
  defaultValues: CreateCareerRequestSchema;
};

const FormContext = createContext<FormContextType | null>(null);

export default FormContext;
