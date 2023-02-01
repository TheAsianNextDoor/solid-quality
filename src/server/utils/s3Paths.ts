export const S3PathFactory = {
  taskImage: (taskId: string, fileName: string) => `images/tasks/${taskId}/${fileName}`,
  taskAttachment: (taskId: string, fileName: string) => `attachments/tasks/${taskId}/${fileName}`,
};
