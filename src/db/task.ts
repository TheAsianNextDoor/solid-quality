import { prisma } from './index';

export const getTaskById = (id: string) => {
  return prisma.task.findFirst({ where: { id } });
};
