import { prismaInstance } from 'server';
import { logFunctionStart, logParams } from 'server/utils/logUtils';

import type { TaskStatus } from '@prisma/client';

export const getTaskById = (id: string) => {
  return prismaInstance.task.findFirst({ where: { id } });
};

export const updateTaskStatusById = async (id: string, status: TaskStatus) => {
  await prismaInstance.task.update({
    where: { id },
    data: {
      status,
    },
  });
};

export const getTaskByInspectionId = async (inspectionId: string) => {
  logFunctionStart();
  logParams({ inspectionId });

  return prismaInstance.task.findMany({
    where: { inspectionId },
    include: { Links: true },
  });
};
