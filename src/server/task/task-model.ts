import { prismaInstance } from 'db';

import type { Prisma } from '@prisma/client';

export const CommentModel = {
  count: (options: Prisma.TaskCountArgs) => prismaInstance.task.count(options),
  create: (options: Prisma.TaskCreateArgs) => prismaInstance.task.create(options),
  createMany: (options: Prisma.TaskCreateManyArgs) => prismaInstance.task.createMany(options),
  deleteFirst: (options: Prisma.TaskDeleteArgs) => prismaInstance.task.delete(options),
  findFirst: (options: Prisma.TaskFindFirstArgs) => prismaInstance.task.findFirst(options),
  findMany: (options: Prisma.TaskFindManyArgs) => prismaInstance.task.findMany(options),
  update: (options: Prisma.TaskUpdateArgs) => prismaInstance.task.update(options),
  updateMany: (options: Prisma.TaskUpdateManyArgs) => prismaInstance.task.updateMany(options),
};
