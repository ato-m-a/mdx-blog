'use client';

import { useState, useEffect, type FC, type KeyboardEvent } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  createPostRequestSchema,
  type CreatePostRequestSchema,
} from '@/schema/post/request.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Tag from './Tag';
import Select from '@/components/Select';
import useCategories from '@/common/hooks/category/useCategories';
import useMarkdown from '@/common/hooks/useMarkdown';

type PostMetadata = Omit<CreatePostRequestSchema, 'content'>;
type MetadataSheetProps = Pick<ReturnType<typeof useMarkdown<PostMetadata>>, 'frontmatter'>;

const MetadataSheet: FC<MetadataSheetProps> = ({ frontmatter }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const form = useForm<PostMetadata>({
    resolver: zodResolver(createPostRequestSchema.omit({ content: true })),
  });

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      const value = e.currentTarget.value.trim();
      if (!value) return;

      const prevTags = form.getValues('tags');
      if (prevTags && !prevTags.includes(value)) form.setValue('tags', [...prevTags, value]);

      e.currentTarget.value = '';
      e.preventDefault();
    }
  };
  const removeTag = (tag: string) => {
    const prevTags = form.getValues('tags');
    if (prevTags && prevTags.includes(tag))
      form.setValue(
        'tags',
        prevTags.filter((t) => t !== tag),
      );
  };

  const onCompositionStart = () => setIsComposing(true);
  const onCompositionEnd = () => setIsComposing(false);

  const categories = useCategories();

  const onSubmit = (data: PostMetadata) => {
    frontmatter.set(data);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) form.reset({});
    else form.reset(frontmatter.get());
  }, [isOpen, form, frontmatter]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          메타데이터 편집
        </Button>
      </SheetTrigger>
      <SheetContent className="border-base flex flex-col gap-10">
        <SheetHeader>
          <SheetTitle>메타데이터 편집</SheetTitle>
          <SheetDescription className="text-sm color-secondary whitespace-pre-wrap">
            게시물의 메타데이터를 편집합니다.{`\n`}
            메타데이터는 게시물의 제목, 부제목, 태그 및 카테고리를 포함합니다.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <FormControl>
                    <Select
                      options={categories}
                      value={field.value}
                      onValueChange={field.onChange}
                      label="카테고리"
                      placeholder="선택"
                    />
                  </FormControl>
                  <FormDescription>게시물의 카테고리를 선택해주세요.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    게시물의 제목을 입력합니다. 제목은 게시물의 최상단에 표시됩니다.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>부제목</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    게시물의 부제목을 입력합니다. 부제목은 게시물의 상단에 표시됩니다.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>태그 목록</FormLabel>
                  <FormControl>
                    <Input
                      onKeyDown={onKeyDown}
                      onCompositionStart={onCompositionStart}
                      onCompositionEnd={onCompositionEnd}
                    />
                  </FormControl>
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((tag) => <Tag key={tag} tag={tag} onClick={removeTag} />)}
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">저장</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default MetadataSheet;
