'use client';

import type { FC } from 'react';
import type { DeletePostRequestSchema } from '@/schema/post/request.schema';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

type DeleteDialogProps = DeletePostRequestSchema & {
  slug: string;
};

const DeleteDialog: FC<DeleteDialogProps> = ({ id, slug }) => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { mutate: deletePost } = trpc.post.delete.useMutation({
    onSuccess: () => {
      router.replace('/post');
      utils.post.getMany.invalidate();
      utils.post.get.invalidate({ slug });
      utils.post.getCountsByTag.invalidate();
      toast.delete_post_success();
    },
    onError: (error) => {
      toast.delete_post_failed(error.message);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash className="w-4 h-4" />
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>포스트를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>삭제된 포스트는 복구할 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost({ id })}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
