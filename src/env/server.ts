import { serverScheme } from './schema';

import type { ZodFormattedError } from 'zod';

export const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    // eslint-disable-next-line array-callback-return, consistent-return
    .map(([name, value]) => {
      // eslint-disable-next-line no-underscore-dangle
      if (value && '_errors' in value) return `${name}: ${value._errors.join(', ')}\n`;
    })
    .filter(Boolean);

const env = serverScheme.safeParse(process.env);

if (env.success === false) {
  // eslint-disable-next-line no-console
  console.error('❌ Invalid environment variables:\n', ...formatErrors(env.error.format()));
  throw new Error('Invalid environment variables');
}

export const serverEnv = env.data;
