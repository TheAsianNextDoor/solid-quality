import { z } from 'zod';

export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ENABLE_VC_BUILD: z
    .string()
    .default('1')
    .transform((v) => parseInt(v, 10)),

  // Auth Config
  AUTH_SECRET: z.string(),
  AUTH_TRUST_HOST: z.string().optional(),
  AUTH_URL: z.string().optional(),

  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // Database Config
  DATABASE_URL: z.string(),

  // AWS Config
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_REGION: z.string(),

  // Pusher Config
  PUSHER_APP_ID: z.string(),
  PUSHER_KEY: z.string(),
  PUSHER_SECRET: z.string(),
  PUSHER_CLUSTER: z.string(),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_PORT: z
    .string()
    .default('3000')
    .transform((v) => parseInt(v, 10)),
  NEXT_PUBLIC_PUSHER_APP_KEY: z.string(),
  NEXT_PUBLIC_PUSHER_CLUSTER: z.string(),
});
