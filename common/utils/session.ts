export const HEADERS_SESSION_KEY = 'x-session-id';
export const REDIS_SESSION_KEY = (sessionId: string) => `session:${sessionId}`;
