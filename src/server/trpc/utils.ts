import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';

import type { IContext } from './context';

export const t = initTRPC.context<IContext>().create({
  transformer: SuperJSON,
});

export const { router } = t;
export const { procedure } = t;

/**
 * Requires procedure to have authentication
 */
export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx?.session?.user?.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to access this resource',
      });
    }
    return next({ ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user } } });
  }),
);
