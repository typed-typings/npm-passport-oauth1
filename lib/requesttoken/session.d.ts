declare class SessionStore {
  constructor (options: { key: string });
  get (req: SessionStore.Request, token: string, cb: (err: Error | null, tokenSecret: string) => void): void;
  set (req: SessionStore.Request, token: string, tokenSecret: string, cb: (err?: Error | null) => void): void;
  destroy (req: SessionStore.Request, token: string, cb: (err?: Error | null) => void): void;
}

declare namespace SessionStore {
  export interface Request {
    session: {
      [key: string]: any;
    };
  }
}

export = SessionStore;
