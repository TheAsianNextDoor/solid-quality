import { z } from 'zod';

import { prismaInstance } from 'db';

import type { Prisma } from '@prisma/client';

export type { Comment } from '@prisma/client';

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: { user: true };
}>;

export const getCommentsByTaskId = (taskId: string | undefined) => {
  if (!taskId) {
    return [];
  }

  return prismaInstance.comment.findMany({
    where: { taskId },
    include: { user: true },
  });
};

export interface createCommentProps {
  message: string;
  userId: string;
  parentId?: string;
  taskId: string;
}

export const createComment = ({ message, userId, parentId, taskId }: createCommentProps) => {
  // z.object({
  //   message: z.string(),
  //   userId: z.string(),
  //   parentId: z.string().optional(),
  //   taskId: z.string(),
  // });

  return prismaInstance.comment.create({
    data: {
      message,
      userId,
      parentId,
      taskId,
    },
  });
};
