import { z } from 'zod';

import { protectedProcedure, router } from '~/server/trpc/utils';

export const inspectionRouter = router({
  getBySiteId: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.inspection.findMany({ where: { siteId: input.siteId }, include: { Task: true } });
    }),
});
