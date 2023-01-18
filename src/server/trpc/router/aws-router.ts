import { z } from 'zod';

import { protectedProcedure, router } from '~/server/trpc/utils';
import { AWS_SDK } from '~/utils/aws-sdk';

export const awsRouter = router({
  getUserImages: protectedProcedure.query(async ({ ctx }) => {
    const userName = ctx.session.user.name;
    const data = await AWS_SDK.s3.getObjectsFromFolder(`images/${userName}`);

    const pathsToFiles = data?.Contents?.map((file) => file.Key) as string[];

    return AWS_SDK.s3.generatePreSignedGetUrl(pathsToFiles);
  }),
  getTaskImageUrls: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const data = await AWS_SDK.s3.getObjectsFromFolder(`images/tasks/${input.taskId}`);

      const pathsToFiles = data?.Contents?.map((file) => file.Key) as string[];

      return AWS_SDK.s3.generatePreSignedGetUrl(pathsToFiles);
    }),
  getTaskPhotoUploadUrls: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        fileNames: z.string().array(),
      }),
    )
    .query(({ input }) => {
      const filePaths = input.fileNames.map((fileName) => `images/tasks/${input.taskId}/${fileName}`);

      return AWS_SDK.s3.generatePreSignedPutUrl(filePaths);
    }),
});
