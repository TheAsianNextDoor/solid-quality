import { TRPCError } from '@trpc/server';

export class BadRequestError extends TRPCError {
  constructor({ message = 'Bad Request', cause = new Error() } = {}) {
    super({ code: 'BAD_REQUEST', message, cause });
  }
}
