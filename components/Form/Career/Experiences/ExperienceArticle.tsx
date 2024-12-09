'use client';

import { useReducer, useEffect, type FC } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/DatePicker';
import useFormContext from '../hooks/useFormContext';
import MarkdownEditor from '@/components/MarkdownEditor';

type ExperienceArticleProps = {
  index: number;
};

const ExperienceArticle: FC<ExperienceArticleProps> = ({ index }) => {
  const { watch, setValue, control, isUpdate } = useFormContext();
  const experiences = watch('experiences');
  const experience = watch(`experiences.${index}`);

  const onRemove = () =>
    setValue(
      'experiences',
      experiences.filter((_, i) => i !== index),
    );

  const [working, dispatch] = useReducer(
    (state: boolean, action: boolean | 'toggle') => {
      return typeof action === 'boolean' ? action : !state;
    },
    isUpdate ? !Boolean(experience.endDate) : false,
  );

  useEffect(() => {
    if (working) setValue(`experiences.${index}.endDate`, null);
  }, [working, setValue, index]);

  return (
    <article className="border-base border-[1px] rounded-md space-y-4 p-4">
      <div className="flex gap-4">
        <FormField
          control={control}
          name={`experiences.${index}.position`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>직무</FormLabel>
              <FormControl>
                <Input placeholder="수행한 직무를 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`experiences.${index}.department`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>부서명</FormLabel>
              <FormControl>
                <Input placeholder="부서명을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-4">
        <FormField
          control={control}
          name={`experiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>시작일</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  fallback="시작일을 선택해주세요."
                  onDateChange={field.onChange}
                  format="yyyy.MM.dd"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`experiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>종료일</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <DatePicker
                    date={field.value}
                    fallback={working ? '현재 재직중' : '종료일을 선택해주세요.'}
                    onDateChange={field.onChange}
                    format="yyyy.MM.dd"
                    disabled={working}
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="working"
                      checked={working}
                      onCheckedChange={() => dispatch('toggle')}
                    />
                    <Label htmlFor="working">재직중</Label>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={`experiences.${index}.content`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>내용 작성</FormLabel>
            <FormControl>
              <MarkdownEditor
                className="h-[400px]"
                source={field.value}
                setSource={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end">
        <Button onClick={onRemove}>삭제</Button>
      </div>
    </article>
  );
};

export default ExperienceArticle;
