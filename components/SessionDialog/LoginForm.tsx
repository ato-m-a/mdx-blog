'use client';

import { useEffect, type FC } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useDialog,
} from '@/components/ui/dialog';
import { CommandShortcut } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormItem, FormControl, FormField } from '@/components/ui/form';
import { loginRequestSchema, type LoginRequestSchema } from '@/schema/auth/request.schema';
import toast from '@/common/utils/toast';
import useLogin from '@/common/hooks/session/useLogin';

const LoginForm: FC = () => {
  const { open, onOpenChange } = useDialog();

  const form = useForm<LoginRequestSchema>({
    resolver: zodResolver(loginRequestSchema),
  });

  const login = useLogin({
    onSuccess: () => onOpenChange?.(false),
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  useEffect(() => {
    const { password: passwordError } = form.formState.errors;

    if (passwordError) toast.login_failed();
  }, [form.formState.errors]);

  return (
    <DialogContent
      className="gap-0 p-4 bg-transparent border-none shadow-none max-w-[30vw] max-lg:max-w-[50vw] max-md:max-w-[70vw] max-sm:max-w-[90vw]"
      overlayProps={{ className: 'backdrop-blur-lg bg-black/10 dark:bg-black/50' }}
      closeButtonVisible={false}
    >
      <DialogHeader hidden>
        <DialogTitle hidden>Login Dialog</DialogTitle>
        <DialogDescription hidden>Enter password to continue</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => login(data))}>
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <Input
                    type="password"
                    className="h-14 rounded-xl focus-visible:ring-1 bg-primary"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <ul className="text-left pl-6 pt-3 space-y-1 [&_li]:text-sm [&_li]:color-tertiary list-disc">
            <li>
              Press <CommandShortcut>Enter</CommandShortcut> to submit password
            </li>
            <li>
              Press <CommandShortcut>Esc</CommandShortcut> or click backdrop to close dialog
            </li>
          </ul>
        </form>
      </Form>
    </DialogContent>
  );
};

export default LoginForm;
