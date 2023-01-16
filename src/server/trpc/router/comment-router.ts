import { randomUUID } from 'crypto';

import { z } from 'zod';

import { CommentModel } from '~/server/db/models/comment-model';
import { pusherClient } from '~/server/pusher';
import { protectedProcedure, router } from '~/server/trpc/utils';

const typingUsers: Record<string, { uuid: string; userName: string }> = {};

export const commentRouter = router({
  getByTaskId: protectedProcedure.input(z.object({ taskId: z.string() })).query(({ input }) => {
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
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id as string;
      const userName = ctx.session.user.name as string;

      const uuid = randomUUID();
      const typingUsersKey = `${userId}-${input.taskId}`;
      typingUsers[typingUsersKey] = {
        uuid,
        userName,
      };

      setTimeout(() => {
        if (uuid === typingUsers[typingUsersKey]?.uuid) {
          delete typingUsers[typingUsersKey];
          pusherClient.trigger('typing-users', `typing-users-task-${input.taskId}`, typingUsers);
        }
      }, 1000);

      pusherClient.trigger('typing-users', `typing-users-task-${input.taskId}`, typingUsers);
    }),
  create: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        parentId: z.string().optional(),
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id as string;

      const comment = await CommentModel.create({ data: { ...input, userId }, include: { user: true } });

      const typingUsersKey = `${userId}-${input.taskId}`;
      delete typingUsers[typingUsersKey];

      pusherClient.trigger('typing-users', `typing-users-task-${input.taskId}`, typingUsers);
      pusherClient.trigger('create-task-comment', `create-task-comment-${input.taskId}`, comment);

      return comment;
    }),
});
