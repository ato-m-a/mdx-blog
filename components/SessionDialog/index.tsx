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
import { Button } from '@/components/ui/button';
import { CommandShortcut } from '@/components/ui/command';
import { toast } from 'sonner';
import Protected from '@/components/Protected';
import useLogout from '@/common/hooks/session/useLogout';
import useExtendSession from '@/common/hooks/session/useExtendSession';
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

  const logout = useLogout({
    onSuccess: () => {
      dispatch('close');
      toast.success('Logged out successfully.');
    },
    onError: () => {
      dispatch('close');
      toast.error('Session already expired.');
    },
  });

  const extend = useExtendSession({
    onSuccess: () => {
      dispatch('close');
      toast.success('Session extended successfully.');
    },
    onError: () => {
      dispatch('close');
      toast.error('Failed to extend session.');
    },
  });

  useCommands('l', () => dispatch('toggle'));
  useCommands('o', () => logout(), { enabled: isOpen });
  useCommands('e', () => extend(), { enabled: isOpen });

  return (
    <Dialog open={isOpen} onOpenChange={dispatch}>
      <Protected fallback={<LoginForm />}>
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
              <Button onClick={() => extend()}>
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
