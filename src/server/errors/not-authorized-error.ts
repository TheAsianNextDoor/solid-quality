import { TRPCError } from '@trpc/server';

export class NotAuthorizedError extends TRPCError {
  constructor({ message = 'You are not authorized to access this resource' } = {}) {
    super({ code: 'UNAUTHORIZED', message });
  }
}
