import { z } from 'zod';

import { prismaInstance } from 'db';

import { sortCommentsFromOldToNew } from './comment-utils';

import type { Prisma } from '@prisma/client';

export type { Comment } from '@prisma/client';

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: { user: true };
}>;

export const getCommentsByTaskId = async (taskId: string | undefined) => {
  if (!taskId) {
    return [];
  }

  const comments = await prismaInstance.comment.findMany({
    where: { taskId },
    include: { user: true },
  });

  return sortCommentsFromOldToNew(comments);
};

export interface createCommentProps {
  message: string;
  userId: string;
  parentId?: string;
  taskId: string;
}

export const createComment = async (data: createCommentProps) => {
  const schema = z.object({
    message: z.string(),
    userId: z.string(),
    parentId: z.string().optional(),
    taskId: z.string(),
  });

  const parse = schema.safeParse(data);

  if (!parse.success) {
    throw new Response(JSON.stringify(parse.error), { status: 422 });
  }

  return prismaInstance.comment.create({ data });
};
