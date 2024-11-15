import type { SessionStorage } from '@/server/trpc/lib/storage';
import { HEADERS_SESSION_KEY, STORAGE_SESSION_KEY } from '@/common/utils/session';
import { UnauthorizedException } from '@/server/trpc/lib/exceptions';
import { parseISO, addSeconds } from 'date-fns';
import { nanoid } from 'nanoid';

export default class Session {
  private readonly storage: SessionStorage;
  private _id: string | null;
  private _expiresAt: Date | null = null;

  constructor(storage: SessionStorage, req?: Request) {
    this.storage = storage;

    const { headers } = req ?? {};
    this._id = headers ? (headers.get(HEADERS_SESSION_KEY) ?? null) : null;
  }

  get id() {
    return this._id;
  }

  get expiresAt(): Date | null {
    return this._expiresAt;
  }

  set expiresAt(value: Date) {
    this._expiresAt = value;
  }

  async create(EX: number = 3600): Promise<string> {
    await this.destroy();

    const sessionId = nanoid();
    await this.storage.set(
      STORAGE_SESSION_KEY(sessionId),
      addSeconds(new Date(), EX).toISOString(),
      EX,
    );
    this.init(sessionId);

    await this.sync();

    return sessionId;
  }

  async destroy(): Promise<void> {
    const sessionId = this.validateSessionId();
    await this.storage.del(STORAGE_SESSION_KEY(sessionId));
    this.init();
  }

  async sync(): Promise<void> {
    const sessionId = this.validateSessionId();
    const stored = await this.getSessionData(sessionId);
    this.expiresAt = parseISO(stored);
  }

  async check(): Promise<boolean> {
    if (!this.id) return false;
    if (!(await this.storage.get(STORAGE_SESSION_KEY(this.id)))) return false;

    return true;
  }

  private validateSessionId(): string {
    if (!this.id) throw new UnauthorizedException();
    return this.id;
  }

  private async getSessionData(sessionId: string): Promise<string> {
    const stored = await this.storage.get(STORAGE_SESSION_KEY(sessionId));
    if (!stored) throw new UnauthorizedException();
    return stored;
  }

  private init(id?: string): void {
    this._id = id ?? null;
    this._expiresAt = null;
  }
}
