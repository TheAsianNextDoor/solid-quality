import { z } from 'zod';
import { randomUUID } from 'crypto';

import { CommentModel } from '~/server/db/models/comment-model';
import { pusherClient } from '~/server/pusher';
import { protectedProcedure, router, t } from '~/server/trpc/utils';

const typingUsers: Record<string, { uuid: string; userName: string }> = {};

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
  userTyping: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        taskId: z.string(),
        userName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const uuid = randomUUID();
      const typingUsersKey = `${input.userId}-${input.taskId}`;
      typingUsers[typingUsersKey] = {
        uuid,
        userName: input.userName,
      };

      setTimeout(() => {
        if (uuid === typingUsers[typingUsersKey].uuid) {
          delete typingUsers[typingUsersKey];
          pusherClient.trigger('typing-users', `typing-users-task-${input.taskId}`, typingUsers);
        }
      }, 1000);

      pusherClient.trigger('typing-users', `typing-users-task-${input.taskId}`, typingUsers);
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
