import { z } from 'zod';

export const serverScheme = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Auth Config
  ENABLE_VC_BUILD: z
    .string()
    .default('1')
    .transform((v) => parseInt(v, 10)),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_TRUST_HOST: z.string().optional(),
  NEXTAUTH_URL: z.string().optional(),

  // Database Config
  DATABASE_URL: z.string(),

  // AWS Config
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_REGION: z.string(),
});

export const clientScheme = z.object({
  WEB_MODE: z.enum(['development', 'production', 'test']).default('development'),
  WEB_PORT: z.number().default(3000),
  WEB_WS_PORT: z.number().default(3001),
});
