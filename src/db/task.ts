import { Prisma } from '@prisma/client';

import type { TaskStatus } from '@prisma/client';

import { prismaInstance } from './index';

const taskWithLinksValidator = Prisma.validator<Prisma.TaskArgs>()({
  include: { Links: true },
});

export type TaskWithLinks = Prisma.TaskGetPayload<typeof taskWithLinksValidator>;

export const getTaskById = (id: string) => {
  return prismaInstance.task.findFirst({ where: { id } });
};

export const updateStatusById = async (id: string, status: TaskStatus) => {
  await prismaInstance.task.update({
    where: { id },
    data: {
      status,
    },
  });
};
