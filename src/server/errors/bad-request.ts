import { TRPCError } from '@trpc/server';

export const BadRequestError = (message?: string, cause?: unknown) => {
  throw new TRPCError({ code: 'BAD_REQUEST', message, cause });
};

export const MissingResourceError = (missingResource?: string, cause?: unknown) =>
  BadRequestError(`Missing Resource for ${missingResource}`, cause);
