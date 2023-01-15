import { z } from 'zod';

import { CommentModel } from '~/server/db/models/comment-model';
import { pusherClient } from '~/server/pusher';
import { protectedProcedure, router, t } from '~/server/trpc/utils';

export const commentRouter = router({
  getCommentsByTask: protectedProcedure.input(z.object({ taskId: z.string() })).query(({ input }) => {
    const { taskId } = input;

    if (!taskId) {
      return [];
    }

    return CommentModel.findMany({
      where: { taskId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }),
  createComment: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.string(),
        parentId: z.string().optional(),
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const comment = await CommentModel.create({ data: input, include: { user: true } });

      pusherClient.trigger('create-task-comment', `create-task-comment-${input.taskId}`, comment);

      return comment;
    }),
});
