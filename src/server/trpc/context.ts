import { getSession } from '@auth/solid-start';

import { authOpts } from '~/routes/api/auth/[...solidauth]';
import { prisma } from '~/server/db/client';

import type { inferAsyncReturnType } from '@trpc/server';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/adapters/node-http';
import type { IncomingMessage } from 'http';
import type { createSolidAPIHandlerContext } from 'solid-start-trpc';
import type ws from 'ws';

export const createContextInner = async (
  opts: createSolidAPIHandlerContext | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>,
) => {
  const session = await getSession(opts.req, authOpts);

  return {
    ...opts,
    prisma,
    session,
  };
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
  return createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
