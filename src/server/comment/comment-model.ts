import { prismaInstance } from 'db';

import type { Prisma } from '@prisma/client';

export const CommentModel = {
  count: (options: Prisma.CommentCountArgs) => prismaInstance.comment.count(options),
  create: (options: Prisma.CommentCreateArgs) => prismaInstance.comment.create(options),
  createMany: (options: Prisma.CommentCreateManyArgs) => prismaInstance.comment.createMany(options),
  deleteFirst: (options: Prisma.CommentDeleteArgs) => prismaInstance.comment.delete(options),
  findFirst: (options: Prisma.CommentFindFirstArgs) => prismaInstance.comment.findFirst(options),
  findMany: (options: Prisma.CommentFindManyArgs) => prismaInstance.comment.findMany(options),
  update: (options: Prisma.CommentUpdateArgs) => prismaInstance.comment.update(options),
  updateMany: (options: Prisma.CommentUpdateManyArgs) => prismaInstance.comment.updateMany(options),
};
