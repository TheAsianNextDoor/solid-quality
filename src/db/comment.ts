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

export const createComment = async (data: createCommentProps) => {
  // const schema = z.object({
  //   message: z.number(),
  //   userId: z.string(),
  //   parentId: z.string().optional(),
  //   taskId: z.string(),
  // });

  // const parse = schema.parse(data);

  // if (!parse.success) {
  //   console.log('hi');
  //   return new Response(JSON.stringify(parse.error), { status: 422 });
  // }

  return prismaInstance.comment.create({ data });
};
