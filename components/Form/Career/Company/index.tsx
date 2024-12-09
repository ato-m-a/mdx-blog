'use client';

import type { FC } from 'react';
import { Heading } from '@/components/ui/Typography';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import getContrastColor from '@/common/utils/getContrastColor';
import useFormContext from '../hooks/useFormContext';

const CompanyForm: FC = () => {
  const form = useFormContext();

  const handleClickColor = () => {
    const colorInput = document.querySelector<HTMLInputElement>('input[type="color"]');
    colorInput?.click();
  };

  return (
    <section className="space-y-6">
      <Heading.h2 className="border-none">회사 정보 입력</Heading.h2>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="basis-1/2">
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
          name="url"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>회사 웹사이트</FormLabel>
              <FormControl>
                <Input placeholder="회사 웹사이트를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>회사 소개</FormLabel>
              <FormControl>
                <Input placeholder="회사 소개를 입력해주세요." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brandColor"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>브랜드 색상</FormLabel>
              <Input
                value={field.value}
                className="cursor-pointer"
                style={{
                  backgroundColor: field.value,
                  color: getContrastColor(field.value),
                }}
                onClick={handleClickColor}
                readOnly
              />
              <FormControl>
                <Input className="absolute bottom-0 left-0 sr-only" type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default CompanyForm;
