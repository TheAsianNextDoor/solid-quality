import { prismaInstance } from 'db';

export type { Comment } from '@prisma/client';

export const getCommentsByTaskId = (taskId: string | undefined) => {
  if (!taskId) {
    return [];
  }

  return prismaInstance.comment.findMany({
    where: { taskId },
    include: { task: true, user: true },
  });
};

export interface createCommentProps {
  message: string;
  userId: string;
  parentId?: string;
  taskId: string;
  inspectionId: string;
}

export const createComment = ({ message, userId, parentId, taskId, inspectionId }: createCommentProps) => {
  return prismaInstance.comment.create({
    data: {
      message,
      userId,
      parentId,
      taskId,
      inspectionId,
    },
  });
};
