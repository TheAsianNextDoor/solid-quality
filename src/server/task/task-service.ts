import { prismaInstance } from 'db';

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
  return prismaInstance.task.findMany({
    where: { inspectionId },
    include: { Links: true },
  });
};
