declare namespace NodeJS {
  interface ProcessEnv {
    PASSWORD: string;
    SALT: string;
    ID: string;
    NAME: string;
    EMAIL: string;
    COOKIE_SESSION_KEY: string;
  }
}
