'use client';

import type { SelectProps as SelectCoreProps } from '@radix-ui/react-select';
import { useState, useEffect, type FC } from 'react';
import {
  Select as SelectCore,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/common/utils';

type OptionalProps = Pick<SelectCoreProps, 'value'>;
type RequiredProps = Required<Pick<SelectCoreProps, 'onValueChange'>>;
type SelectProps = OptionalProps &
  RequiredProps & {
    options: string[];
    label: string;
    placeholder: string;
    className?: string;
  };

const Select: FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  label,
  placeholder,
  className,
}) => {
  /** hydration 과정의 불일치 문제로 SelectValue 깜빡임 현상이 있어 임시 조치 */
  const [isMount, setIsMount] = useState(false);
  useEffect(() => setIsMount(true), []);

  return (
    <SelectCore
      onValueChange={(value: string) => onValueChange(value !== 'null' ? value : '')}
      value={isMount ? (value ?? 'null') : undefined}
    >
      <SelectTrigger>
        <SelectValue placeholder={value || placeholder} />
      </SelectTrigger>
      <SelectContent className={cn('!bg-primary', className)}>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="null" className="cursor-pointer">
            {placeholder}
          </SelectItem>
          {options.map((option, index) => (
            <SelectItem key={`select-item-${index}`} value={option} className="cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectCore>
  );
};

export default Select;
