import { randomUUID } from 'crypto';

import { z } from 'zod';

import { CommentModel } from '~/server/db/models/comment-model';
import { MissingResourceError } from '~/server/errors/missing-resource-error';
import { pusherClient } from '~/server/pusher';
import { protectedProcedure, router } from '~/server/trpc/utils';

const typingUsers: Record<string, { uuid: string; userName: string; userId: string }> = {};

export const commentRouter = router({
  getByTaskId: protectedProcedure.input(z.object({ taskId: z.string() })).query(async ({ input, ctx }) => {
    const { taskId } = input;

    const comments = await ctx.prisma.comment.findMany({
      where: { taskId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });

    if (!comments) {
      throw new MissingResourceError({ missingResource: `comment with taskId: ${taskId}` });
    }

    return comments;
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
        userId,
      };

      setTimeout(() => {
        if (uuid === typingUsers[typingUsersKey]?.uuid) {
          delete typingUsers[typingUsersKey];
          pusherClient.trigger('typing-users', `typing-users-task-${input.taskId}`, typingUsers);
        }
      }, 1500);

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
      pusherClient.trigger('create-comment-task', `create-comment-task-${input.taskId}`, comment);

      return comment;
    }),
});
