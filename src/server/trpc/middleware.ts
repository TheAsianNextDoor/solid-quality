import { t } from './singleton';
import { NotAuthorizedError } from '../errors/not-authorized-error';

/**
 * Logs important information regarding the request
 */
export const loggerMiddleware = t.middleware(async ({ input, rawInput, meta, path, type, next }) => {
  const start = new Date();

  // eslint-disable-next-line no-console
  console.log(
    `[${start.toLocaleString()} - START] ${path}\n`,
    JSON.stringify({ type, rawInput, input, meta }, null, 2),
  );

  const result = await next();
  const end = new Date();
  const durationMs = end.getTime() - start.getTime();

  if (result.ok) {
    // eslint-disable-next-line no-console
    console.log(`[${end.toLocaleString()} - END] ${path} OK\n`, JSON.stringify({ durationMs }, null, 2));
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${end.toLocaleString()} - END] ${path} NOT-OK\n`, JSON.stringify({ durationMs }, null, 2));
  }

  return result;
});

/**
 * Requires request to have authenticated session
 */
export const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx?.session?.user?.id) {
    throw new NotAuthorizedError();
  }
  return next({ ctx });
});
