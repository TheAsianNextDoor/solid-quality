import { getSession } from '@auth/solid-start';

import { authOpts } from '~/routes/api/auth/[...solidauth]';
import { prisma } from '~/server/prisma/client';

import type { inferAsyncReturnType } from '@trpc/server';
import type { createSolidAPIHandlerContext } from 'solid-start-trpc';

export const createContextInner = async (opts: createSolidAPIHandlerContext) => {
  const authSession = await getSession(opts.req, authOpts);
  let user;

  if (authSession?.user?.email) {
    user = await prisma.user.findUnique({ select: { id: true }, where: { email: authSession.user.email } });
  }

  return {
    ...opts,
    prisma,
    session: {
      expires: authSession?.expires,
      user: {
        id: user?.id || 'Unable to find User',
        ...authSession?.user,
      },
    },
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
