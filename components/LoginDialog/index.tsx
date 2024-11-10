'use client';

import { useState, type FC } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginRequestSchema, { type LoginRequestSchema } from '@/schema/login/login-request.schema';
import useCommands from '@/common/hooks/useCommands';
import trpc from '@trpc.client';

const LoginDialog: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useCommands(['l'], () => setIsOpen(true));

  const form = useForm<LoginRequestSchema>({
    resolver: zodResolver(loginRequestSchema),
  });

  const onOpenChange = (state: boolean) =>
    unstable_batchedUpdates(() => {
      if (!state) form.reset({});
      setIsOpen(state);
    });

  const { data: sessionValid, refetch: refetchSessionValid } = trpc.auth.checkPermission.useQuery();

  const { mutate: login } = trpc.auth.login.useMutation({
    onSuccess: (sessionId) => {
      sessionStorage.setItem('sessionId', sessionId);
      toast.success('Login Success');
      onOpenChange(false);
      refetchSessionValid();
    },
    onError: () => toast.error('Login Failed', { description: 'Invalid Password!' }),
  });

  const { mutate: logout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      sessionStorage.removeItem('sessionId');
      toast.success('Logout Success');
      onOpenChange(false);
      refetchSessionValid();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col">
        <DialogHeader hidden>
          <DialogTitle hidden>Login Dialog</DialogTitle>
          <DialogDescription hidden>Enter password to continue</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((e) => login(e))} className="mt-4">
            <FormField
              control={form.control}
              defaultValue=""
              name="password"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel className="text-2xl">🔐</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={sessionValid ? 'Already Loggged in' : 'Enter Password'}
                      disabled={sessionValid}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <Button
                type={sessionValid ? 'button' : 'submit'}
                onClick={sessionValid ? () => logout() : undefined}
              >
                {sessionValid ? 'Destroy Session' : 'Confirm'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
