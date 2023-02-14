import { z } from 'zod';

import { protectedProcedure, router } from '~/server/trpc/utils';

import type { TaskStatus } from '@prisma/client';

export const taskRouter = router({
  byId: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.task.findFirst({ where: { id: input.taskId }, include: { Links: true } });
    }),
  getTasksByInspection: protectedProcedure
    .input(
      z.object({
        inspectionId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      const { inspectionId } = input;
      return ctx.prisma.task.findMany({
        where: { inspectionId },
        include: { Links: true },
      });
    }),
  updateTaskStatus: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        status: z.union([z.literal('PASSED'), z.literal('ACCEPTABLE'), z.literal('FAILED'), z.literal('SKIPPED')]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { taskId } = input;
      const status = input.status as TaskStatus;

      await ctx.prisma.task.update({
        where: { id: taskId },
        data: {
          status,
        },
      });
    }),
});
