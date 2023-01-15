import { prisma } from '~/server/db/client';

import type { Prisma } from '@prisma/client';

export const TaskModel = {
  count: (options: Prisma.TaskCountArgs) => prisma.task.count(options),
  create: (options: Prisma.TaskCreateArgs) => prisma.task.create(options),
  createMany: (options: Prisma.TaskCreateManyArgs) => prisma.task.createMany(options),
  deleteFirst: (options: Prisma.TaskDeleteArgs) => prisma.task.delete(options),
  findFirst: (options: Prisma.TaskFindFirstArgs) => prisma.task.findFirst(options),
  findMany: (options: Prisma.TaskFindManyArgs) => prisma.task.findMany(options),
  update: (options: Prisma.TaskUpdateArgs) => prisma.task.update(options),
  updateMany: (options: Prisma.TaskUpdateManyArgs) => prisma.task.updateMany(options),
};
