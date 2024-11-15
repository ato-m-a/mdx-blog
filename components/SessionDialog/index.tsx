'use client';

import { useReducer, type FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { unstable_batchedUpdates } from 'react-dom';
import { Button } from '@/components/ui/button';
import { CommandShortcut } from '@/components/ui/command';
import { toast } from 'sonner';
import trpc from 'trpc-client';
import Protected from '@/components/lib/Protected';
import useCommands from '@/common/hooks/useCommands';
import LoginForm from './LoginForm';

const SessionDialog: FC = () => {
  const [isOpen, dispatch] = useReducer(
    (state: boolean, action: boolean | ('open' | 'close' | 'toggle')) => {
      if (typeof action === 'boolean') return action;
      if (action === 'open') return true;
      if (action === 'close') return false;
      return !state;
    },
    false,
  );

  const utils = trpc.useUtils();

  const onSuccess = () =>
    unstable_batchedUpdates(() => {
      dispatch('close');
      utils.auth.checkPermission.invalidate();
    });

  const { mutate: logout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      onSuccess();
      sessionStorage.removeItem('sessionId');
      toast.success('Logged out successfully.');
    },
    onError: () => {
      onSuccess();
      sessionStorage.removeItem('sessionId');
      toast.error('Session already expired.');
    },
  });

  const { mutate: extendSession } = trpc.auth.extendSession.useMutation({
    onSuccess: (sessionId) => {
      sessionStorage.setItem('sessionId', sessionId);
      toast.success('Session extended successfully.');
    },
    onError: () => {
      toast.error('Failed to extend session.');
    },
  });

  useCommands('l', () => dispatch('toggle'));
  useCommands('o', () => logout());

  return (
    <Dialog open={isOpen} onOpenChange={dispatch}>
      <Protected fallback={<LoginForm onSuccess={onSuccess} />}>
        <DialogContent className="space-y-4 border-base" closeButtonVisible={false}>
          <DialogHeader>
            <DialogTitle>Session Management</DialogTitle>
            <DialogDescription className="text-sm color-secondary">
              You are currently logged in with admin privileges.
            </DialogDescription>
          </DialogHeader>
          <section className="flex justify-between">
            <div className="flex space-x-2">
              <Button onClick={() => logout()}>
                Logout
                <CommandShortcut>⌘O</CommandShortcut>
              </Button>
              <Button onClick={() => extendSession()}>
                Extend Session
                <CommandShortcut>⌘E</CommandShortcut>
              </Button>
            </div>
            <DialogClose asChild>
              <Button variant="outline">
                Close
                <CommandShortcut>Esc</CommandShortcut>
              </Button>
            </DialogClose>
          </section>
        </DialogContent>
      </Protected>
    </Dialog>
  );
};

export default SessionDialog;
