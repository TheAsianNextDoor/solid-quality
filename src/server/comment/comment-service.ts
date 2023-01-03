import { z } from 'zod';

import { parseResponseParams } from '../utils/parseUtils';
import { CommentModel } from './comment-model';

import type { Prisma } from '@prisma/client';

export const getCommentsByTaskId = async (taskId: string | undefined) => {
  if (!taskId) {
    return [];
  }

  return CommentModel.findMany({
    where: { taskId },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });
};

export const createComment = async (data: Prisma.CommentUncheckedCreateInput) => {
  const schema = z.object({
    message: z.string(),
    userId: z.string(),
    parentId: z.string().optional(),
    taskId: z.string(),
  });

  parseResponseParams(schema, data);

  return CommentModel.create({ data });
};
