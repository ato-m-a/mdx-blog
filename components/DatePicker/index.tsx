'use client';

import { useState, type FC } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/common/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ko } from 'date-fns/locale/ko';

type DatePickerProps = {
  date: Date | null;
  fallback: string;
  onDateChange: (date: Date | undefined) => void;
  format: string;
  disabled?: boolean;
};

const DatePicker: FC<DatePickerProps> = ({
  date,
  fallback,
  format: dateFormat = 'yyyy.MM.dd',
  onDateChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const today = new Date();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'color-secondary',
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, dateFormat) : <span>{fallback}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={ko}
          selected={date ?? undefined}
          onSelect={(e) => {
            setIsOpen(false);
            onDateChange(e);
          }}
          defaultMonth={date ?? today}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
