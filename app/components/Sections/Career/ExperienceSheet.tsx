'use client';

import type { FC } from 'react';
import type { ExperienceSchema } from '@/schema/experience/base.schema';
import type { EditableProps, WithTrigger } from '@/components/types';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import trpc from 'trpc-client';

type ExperienceSheetProps = EditableProps<ExperienceSchema> & WithTrigger;

const ExperienceSheet: FC<ExperienceSheetProps> = ({ trigger, edit, ...experience }) => {
  const { data: isAdmin } = trpc.auth.checkPermission.useQuery();
  console.log(experience);

  if (!isAdmin) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>{trigger}</div>
      </SheetTrigger>
      <SheetContent className="border-base">
        <SheetHeader>
          <SheetTitle>이력 {edit ? '수정' : '추가'}</SheetTitle>
          <SheetDescription>이력을 {edit ? '수정' : '추가'}합니다.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ExperienceSheet;
