'use client';

import { useEffect, useState, type FC, type HTMLAttributes, type ReactNode } from 'react';
import { intervalToDuration, type Duration } from 'date-fns';
import { cn } from '@/common/utils';
import { Skeleton } from '@/components/ui/skeleton';
import trpc from 'trpc-client';
import Protected from '@/components/lib/Protected';

type ParagraphProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'prefix' | 'suffix'>;
type SessionExpiryCounterProps = ParagraphProps & {
  prefix?: ReactNode;
  suffix?: ReactNode;
  fallback?: ReactNode;
  refetchInterval?: number;
};

const SessionExpiryCounter: FC<SessionExpiryCounterProps> = ({
  className,
  prefix = '',
  suffix = '',
  fallback = <Skeleton className="h-[1.3em] w-[5ch]" />,
  refetchInterval = 60000,
  ...props
}) => {
  const { data } = trpc.auth.getExpiry.useQuery(undefined, {
    refetchInterval,
    refetchOnWindowFocus: true,
  });

  const [count, setCount] = useState<Duration | null>(null);

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setCount(intervalToDuration({ start: new Date(), end: data }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const formattedCount = count
    ? `${count.minutes?.toString().padStart(2, '0')}:${count.seconds?.toString().padStart(2, '0')}`
    : fallback;

  return (
    <Protected>
      <div className={cn('flex gap-1 items-center', className)} {...props}>
        {prefix}
        {formattedCount}
        {suffix}
      </div>
    </Protected>
  );
};

export default SessionExpiryCounter;
