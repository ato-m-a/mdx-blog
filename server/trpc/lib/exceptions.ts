import { TRPCError } from '@trpc/server';

export class UnauthorizedException extends TRPCError {
  constructor(message?: string) {
    super({ code: 'UNAUTHORIZED', message });
  }
}
