'use client';

import { useEffect, useState, type FC, type HTMLAttributes, type ReactNode } from 'react';
import { intervalToDuration } from 'date-fns';
import { cn } from '@/common/utils';
import { Skeleton } from '@/components/ui/skeleton';
import trpc from 'trpc-client';
import Protected from '@/components/Protected';
import getQueryState from '@/common/utils/getQueryState';

type ParagraphProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'prefix' | 'suffix'>;
type SessionExpiryCounterProps = ParagraphProps & {
  prefix?: ReactNode;
  suffix?: ReactNode;
  fallback?: ReactNode;
  refetchInterval?: number;
};

const CounterSkeleton: FC = () => <Skeleton className="h-[1.3em] w-[5ch]" />;
const appendZero = (count?: number) => count?.toString().padStart(2, '0');

const SessionExpiryCounter: FC<SessionExpiryCounterProps> = ({
  className,
  prefix = '',
  suffix = '',
  fallback = <CounterSkeleton />,
  refetchInterval = 60000,
  ...props
}) => {
  const { data, ...status } = trpc.auth.getExpiry.useQuery(undefined, {
    refetchInterval,
    refetchOnWindowFocus: true,
  });
  const { isInitialLoading } = getQueryState(status);

  const [now, setNow] = useState(() => new Date());
  const count = intervalToDuration({ start: now, end: data ?? new Date() });

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Protected fallback={fallback}>
      <div className={cn('flex gap-1 items-center', className)} {...props}>
        {prefix}
        {isInitialLoading ? (
          <CounterSkeleton />
        ) : data ? (
          `${appendZero(count.minutes)}:${appendZero(count.seconds)}`
        ) : (
          fallback
        )}
        {suffix}
      </div>
    </Protected>
  );
};

export default SessionExpiryCounter;
