import { EventEmitter } from 'events';

import { observable } from '@trpc/server/observable';
import { z } from 'zod';

import { CommentModel } from '~/server/db/models/comment-model';
import { protectedProcedure, router } from '~/server/trpc/utils';

const ee = new EventEmitter();

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
    .mutation(({ input }) => {
      ee.emit('createComment', input);

      return CommentModel.create({ data: input });
    }),
  observedComments: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      const onComment = (data) => {
        console.log('In observed: ', data);
        emit.next(data);
      };

      ee.on('createComment', onComment);

      return () => {
        ee.off('createComment', onComment);
      };
    });
  }),
});
