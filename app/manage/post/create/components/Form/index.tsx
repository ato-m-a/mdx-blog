'use client';

import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import createPostSchema, { type CreatePostSchema } from '@/schema/post/create-post.schema';
import Select from '@/components/Select';
import useCategories from '@/common/hooks/category/useCategories';
import toast from '@/common/utils/toast';
import trpc from 'trpc-client';

const CreatePostForm: FC = () => {
  const router = useRouter();
  const categories = useCategories();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      category: undefined,
      title: '',
      subtitle: '',
      tag: '',
      content: '',
    },
  });

  const utils = trpc.useUtils();
  const { mutate: createPost } = trpc.post.create.useMutation({
    onSuccess: ({ slug }) => {
      utils.post.invalidate();
      router.push(`/post/${slug}`);
      toast.create_post_success();
    },
    onError: ({ message }) => {
      toast.create_post_failed(message);
    },
  });

  return (
    <section className="h-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 h-full"
          onSubmit={form.handleSubmit((data) => createPost(data))}
        >
          <div className="flex gap-10 max-lg:gap-6 max-md:gap-4 max-sm:flex-col">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="basis-1/5">
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <Select
                      options={categories}
                      label="카테고리"
                      placeholder="선택"
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="제목을 입력해주세요"
                      className="resize-none"
                      rows={1}
                      rowsAutoIncrement
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10 max-lg:gap-6 max-md:gap-4 max-md:flex-col">
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>부제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="부제목을 입력해주세요." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel>태그</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="태그를 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col h-full">
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="font-codeblock text-sm resize-none flex-1"
                    placeholder="내용을 입력해주세요"
                    rowsAutoIncrement
                    enableTab
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 max-sm:flex-col max-sm:gap-2">
            <Button type="button" variant="outline">
              미리보기
            </Button>
            <Button type="submit">게시하기</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePostForm;
