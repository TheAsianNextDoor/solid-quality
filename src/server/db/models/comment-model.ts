import { prisma } from '~/server/db/client';

import type { Prisma } from '@prisma/client';

export const CommentModel = {
  count: (options: Prisma.CommentCountArgs) => prisma.comment.count(options),
  create: (options: Prisma.CommentCreateArgs) => prisma.comment.create(options),
  createMany: (options: Prisma.CommentCreateManyArgs) => prisma.comment.createMany(options),
  deleteFirst: (options: Prisma.CommentDeleteArgs) => prisma.comment.delete(options),
  findFirst: (options: Prisma.CommentFindFirstArgs) => prisma.comment.findFirst(options),
  findMany: (options: Prisma.CommentFindManyArgs) => prisma.comment.findMany(options),
  update: (options: Prisma.CommentUpdateArgs) => prisma.comment.update(options),
  updateMany: (options: Prisma.CommentUpdateManyArgs) => prisma.comment.updateMany(options),
};
