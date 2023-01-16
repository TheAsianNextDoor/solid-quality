import Github from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { SolidAuth, type SolidAuthConfig } from '@auth/solid-start';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { serverEnv } from '~/env/server';
import { prisma } from '~/server/db/client';

export const authOpts: SolidAuthConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore types error
    Github({
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    }),
    // @ts-ignore types error
    Google({
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'database',
    generateSessionToken: () => {
      return crypto.randomUUID();
    },
  },
  debug: false,
};

export const { GET, POST } = SolidAuth(authOpts);
