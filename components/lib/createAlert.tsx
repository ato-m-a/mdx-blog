'use client';

import { cloneElement, isValidElement, type ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

type CreateAlertOptions = {
  title: string;
  description: string;
  trigger: ReactNode;
  cancel?: string;
  action: [string, VoidFunction];
  enabled?: boolean;
};

export const createAlert = ({
  title,
  description,
  cancel = '취소',
  action,
  trigger,
  enabled = true,
}: CreateAlertOptions) => {
  const Component = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={action[1]}>{action[0]}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const ClonedTrigger = () =>
    cloneElement(isValidElement(trigger) ? trigger : <div>{trigger}</div>, {
      onClick: action[1],
    });

  return enabled ? Component : ClonedTrigger;
};
