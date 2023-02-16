import { procedure, router } from '~/server/trpc/utils';

export const sessionRouter = router({
  get: procedure.query(({ ctx }) => {
    return ctx?.session;
  }),
  userName: procedure.query(({ ctx }) => {
    return ctx?.session?.user?.name || '';
  }),
  userId: procedure.query(({ ctx }) => {
    return ctx?.session?.user?.id || '';
  }),
});
