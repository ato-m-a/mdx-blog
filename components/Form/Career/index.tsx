'use client';

import type { FC } from 'react';
import {
  createCareerRequestSchema,
  updateCareerRequestSchema,
  type CreateCareerRequestSchema,
} from '@/schema/company/request.schema';
import { Form as FormCore } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { add } from 'date-fns';
import FormContext from './context';
import CompanyForm from './Company';
import ExperiencesForm from './Experiences';
import CareerFormFooter from './Footer';
import switchCase from '@/common/utils/switchCase';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

type OnErrorParams = { message: string };
type CareerFormProps =
  | {
      action: 'update';
      id: number;
    }
  | {
      action: 'create';
      id?: never;
    };

const defaultValues = {
  name: '',
  url: '',
  brandColor: '#000000',
  description: '',
  experiences: [],
};

const Form: FC<CareerFormProps> = ({ action, id }) => {
  const router = useRouter();

  const isUpdate = action === 'update' && Boolean(id);
  const { data: career } = trpc.company.getCareer.useQuery({ id: id! }, { enabled: isUpdate });

  const toastOnFailure = (message: string) =>
    switchCase(action, {
      create: () => toast.create_career_failed(message),
      update: () => toast.update_career_failed(message),
    });
  const toastOnSuccess = switchCase(action, {
    create: () => toast.create_career_success(),
    update: () => toast.update_career_success(),
  });

  const form = useForm<CreateCareerRequestSchema>({
    defaultValues: career ? { ...career } : defaultValues,
    resolver: zodResolver(createCareerRequestSchema),
  });

  const utils = trpc.useUtils();

  const mutationOptions = {
    onSuccess: () => {
      if (id) utils.company.getCareer.invalidate({ id });
      utils.company.getCareers.invalidate();
      router.push('/manage/career');
      toastOnSuccess();
    },
    onError: ({ message }: OnErrorParams) => {
      toastOnFailure(message);
    },
  };

  const { mutate: updateCareer } = trpc.company.updateCareer.useMutation(mutationOptions);
  const { mutate: createCareer } = trpc.company.createCareer.useMutation(mutationOptions);

  const handleSubmit = form.handleSubmit((data) => {
    const schema = switchCase(action, {
      create: createCareerRequestSchema,
      update: updateCareerRequestSchema,
    });

    const { data: parsed, error } = schema.safeParse({
      ...data,
      experiences: data.experiences.map((experience) => ({
        ...experience,
        startDate: add(experience.startDate, { hours: 9 }),
        endDate: experience.endDate ? add(experience.endDate, { hours: 9 }) : null,
      })),
      ...(isUpdate ? { id } : {}),
    });

    if (error) return toastOnFailure(error.message);

    const mutateFn = switchCase(action, {
      create: () => createCareer(parsed),
      update: () => updateCareer({ ...parsed, id: id! }),
    });
    return mutateFn();
  });

  return (
    <FormCore {...form}>
      <form className="space-y-12" onSubmit={handleSubmit}>
        <FormContext.Provider value={{ ...form, isUpdate, defaultValues }}>
          <CompanyForm />
          <ExperiencesForm />
          <CareerFormFooter />
        </FormContext.Provider>
      </form>
    </FormCore>
  );
};

export default Form;
