import { z } from 'zod';

import { TaskModel } from '~/server/db/models/task-model';
import { protectedProcedure, router } from '~/server/trpc/utils';

import type { TaskStatus } from '@prisma/client';

export const taskRouter = router({
  getTasksByInspection: protectedProcedure
    .input(
      z.object({
        inspectionId: z.string(),
      }),
    )
    .query(({ input }) => {
      const { inspectionId } = input;
      return TaskModel.findMany({
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
    .mutation(async ({ input }) => {
      const { taskId } = input;
      const status = input.status as TaskStatus;

      await TaskModel.update({
        where: { id: taskId },
        data: {
          status,
        },
      });
    }),
});
