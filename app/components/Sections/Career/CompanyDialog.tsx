'use client';

import type { FC } from 'react';
import type { EditableProps, WithTrigger } from '@/components/types';
import companySchema, { type CompanySchema } from '@/schema/company/company.schema';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import ColorBadge from '@/components/ColorBadge';
import trpc from '@trpc.client';

type CompanyDialogProps = EditableProps<CompanySchema> & WithTrigger;

const CompanyDialog: FC<CompanyDialogProps> = ({ edit, trigger, ...company }) => {
  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema.omit({ id: true, createdAt: true, updatedAt: true })),
    defaultValues: edit ? company : {},
  });

  const { data: isAdmin } = trpc.auth.checkPermission.useQuery();

  const handleClickColorInput = () => {
    const colorInput = document.querySelector<HTMLInputElement>('input[type="color"]');

    if (colorInput) colorInput.click();
  };

  if (!isAdmin) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle className="color-primary">회사 정보 수정</DialogTitle>
          <DialogDescription className="color-secondary">회사 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>회사명</FormLabel>
                  <FormControl>
                    <Input placeholder="회사명을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input placeholder="설명을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="바로가기 URL을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>브랜드 색상</FormLabel>
                  <FormControl>
                    <div className="flex relative gap-4 items-center">
                      <ColorBadge
                        color={field.value}
                        className="w-4 h-4 cursor-pointer rounded-sm"
                        onClick={handleClickColorInput}
                      />
                      <Input
                        type="text"
                        className="cursor-pointer color-secondary hover:color-primary transition-colors duration-100"
                        value={field.value}
                        onClick={handleClickColorInput}
                        readOnly
                      />
                      <Input type="color" className="invisible absolute" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button type="submit">수정</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDialog;
