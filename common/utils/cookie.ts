import { InternalServerErrorException } from '@/server/trpc/lib/exceptions';
import * as cookie from 'cookie';

type SetSessionCookieOptions = {
  sessionId: string;
  maxAge?: number;
  resHeaders?: Headers;
};

const COOKIE_SESSION_KEY = process.env.COOKIE_SESSION_KEY;

export const getSessionCookie = (reqHeaders?: Headers) => {
  const cookieHeader = reqHeaders?.get('cookie');

  return cookieHeader ? cookie.parse(cookieHeader)[COOKIE_SESSION_KEY] : null;
};

export const setSessionCookie = ({
  sessionId,
  maxAge = 3600,
  resHeaders,
}: SetSessionCookieOptions) => {
  if (!resHeaders) throw new InternalServerErrorException('No response headers found');

  resHeaders?.set(
    'Set-Cookie',
    cookie.serialize(COOKIE_SESSION_KEY, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      sameSite: 'strict',
      path: '/',
    }),
  );
};
