'use client';

import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Undo, Save } from 'lucide-react';
import { createAlert } from '@/components/lib';
import useFormContext from '../hooks/useFormContext';

const CareerFormFooter: FC = () => {
  const router = useRouter();
  const { isUpdate, defaultValues, ...form } = useFormContext();

  const handleReset = () => form.reset(defaultValues);

  const ResetDialog = createAlert({
    title: '정말 초기화하시겠습니까?',
    description: '초기화된 데이터는 복구할 수 없습니다.',
    action: ['초기화', handleReset],
    cancel: '취소',
    trigger: (
      <Button variant="secondary" type="button">
        <RefreshCcw className="w-4 h-4" />
        초기화
      </Button>
    ),
    enabled: form.formState.isDirty,
  });

  const CancelDialog = createAlert({
    title: '작성을 취소하고 뒤로가기 하시겠습니까?',
    description: '작성한 데이터는 복구할 수 없습니다.',
    action: ['뒤로가기', () => router.back()],
    cancel: '취소',
    trigger: (
      <Button variant="secondary" type="button">
        <Undo className="w-4 h-4" />
        취소
      </Button>
    ),
    enabled: form.formState.isDirty,
  });

  return (
    <div className="flex gap-4 justify-end">
      {isUpdate && <ResetDialog />}
      <CancelDialog />
      <Button type="submit">
        <Save className="w-4 h-4" />
        저장
      </Button>
    </div>
  );
};

export default CareerFormFooter;
