'use client';

import type { FC } from 'react';
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

const CreatePostForm: FC = () => {
  const categories = useCategories();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  return (
    <section className="h-full">
      <Form {...form}>
        <form className="flex flex-col gap-4 h-full">
          <div className="flex gap-10">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="basis-1/6">
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
                    <Input {...field} placeholder="제목을 입력해주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>태그</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="태그를 입력해주세요" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="h-full flex flex-col">
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="flex-1 resize-none font-codeblock"
                    placeholder="내용을 입력해주세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">게시하기</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePostForm;
