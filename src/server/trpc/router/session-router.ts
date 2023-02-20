import { getSession } from '@auth/solid-start';

import { authOpts } from '~/routes/api/auth/[...solidauth]';
import { procedure, router } from '~/server/trpc/utils';

export const sessionRouter = router({
  getSession: procedure.query(({ ctx }) => {
    return getSession(ctx.req, authOpts);
  }),
  getUserName: procedure.query(({ ctx }) => {
    return ctx?.session?.user?.name || '';
  }),
  getUserId: procedure.query(({ ctx }) => {
    return ctx?.session?.user?.id || '';
  }),
});
