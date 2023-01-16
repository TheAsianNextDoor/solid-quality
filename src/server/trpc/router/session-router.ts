import { protectedProcedure, router } from '~/server/trpc/utils';

export const sessionRouter = router({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  userName: protectedProcedure.query(({ ctx }) => {
    return ctx?.session?.user?.name || '';
  }),
});
