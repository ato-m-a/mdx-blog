import type { FC, PropsWithChildren } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Protected from '@/components/Protected';
import trpc from 'trpc-server';

/**
 * 세션 검증을 수행하는데, 미들웨어가 node.js 런타임을 지원하지 않아 TCP 기반의 redis client 사용이 불가해 레이아웃에서 수행합니다.
 *
 * 추후 kv 사용하거나 Next.js를 버려야겠습니다...
 */
const ManageLayout: FC<PropsWithChildren> = async ({ children }) => {
  const cookie = cookies();
  const storedSessionId = cookie.get(process.env.COOKIE_SESSION_KEY)?.value;
  const sessionValid = await trpc.auth.checkPermission({ id: storedSessionId });
  if (!sessionValid) redirect('/');

  return (
    <>
      {children}
      <Protected replaceTo="/" />
    </>
  );
};

export default ManageLayout;
