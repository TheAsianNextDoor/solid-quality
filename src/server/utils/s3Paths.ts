export const S3PathFactory = {
  taskImage: (taskId: string, fileName: string) => `images/tasks/${taskId}/${fileName}`,
};
