import type { TaskStatus } from '@prisma/client';

import { prisma } from './index';

export const getTaskById = (id: string) => {
  return prisma.task.findFirst({ where: { id } });
};

export const updateStatusById = async (id: string, status: TaskStatus) => {
  await prisma.task.update({
    where: { id },
    data: {
      status,
    },
  });
};
