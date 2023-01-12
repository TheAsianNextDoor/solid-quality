import { z } from 'zod';
import Pusher from 'pusher';

import { CommentModel } from '~/server/db/models/comment-model';
import { protectedProcedure, router, t } from '~/server/trpc/utils';

const pusher = new Pusher({
  appId: '1537281',
  key: '88de8c4680421d149378',
  secret: '9241de981b93130c3d33',
  cluster: 'us2',
  useTLS: true,
});

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

      pusher.trigger('create-task-comment', `create-task-comment-${input.taskId}`, comment);

      return comment;
    }),
});
