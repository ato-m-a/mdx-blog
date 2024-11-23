import { TRPCError } from '@trpc/server';

export class UnauthorizedException extends TRPCError {
  constructor(message?: string) {
    super({ code: 'UNAUTHORIZED', message });
  }
}

export class InternalServerErrorException extends TRPCError {
  constructor(message?: string) {
    super({ code: 'INTERNAL_SERVER_ERROR', message });
  }
}
