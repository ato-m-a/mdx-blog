const SESSION_ID_KEY = 'sessionId';

export const getSessionId = () => sessionStorage.getItem(SESSION_ID_KEY);
export const setSessionId = (sessionId: string) =>
  sessionStorage.setItem(SESSION_ID_KEY, sessionId);
export const removeSessionId = () => sessionStorage.removeItem(SESSION_ID_KEY);
