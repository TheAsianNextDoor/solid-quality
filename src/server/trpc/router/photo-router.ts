import { z } from 'zod';

import { PhotoModel } from '~/server/db/models/photo-model';
import { router, protectedProcedure } from '~/server/trpc/utils';
import { S3PathFactory } from '~/server/utils/s3Paths';

import { awsRouter } from './aws-router';

export const photoRouter = router({
  getById: protectedProcedure
    .input(
      z.object({
        photoId: z.string(),
      }),
    )
    .query(({ input }) => {
      return PhotoModel.findFirst({ where: { id: input.photoId } });
    }),
  uploadByTask: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        mimeType: z.string(),
        taskId: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { fileName, mimeType, taskId } = input;
      const path = S3PathFactory.taskImage(taskId, fileName);

      return PhotoModel.create({ data: { mimeType, taskId, userId, path } });
    }),
  signedPutUrlsByTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        fileNames: z.string().array(),
      }),
    )
    .query(({ input, ctx }) => {
      const awsCaller = awsRouter.createCaller(ctx);
      const filePaths = input.fileNames.map((fileName) => S3PathFactory.taskImage(input.taskId, fileName));

      return awsCaller.signedPutUrls({ filePaths });
    }),
  signedGetUrlsByTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const awsCaller = awsRouter.createCaller(ctx);
      const photos = await PhotoModel.findMany({ where: { taskId: input.taskId }, orderBy: { createdAt: 'asc' } });
      const filePaths = photos.map((photo) => photo.path);
      const urls = await awsCaller.signedGetUrls({ filePaths });

      return photos.map((photo, i) => ({ ...photo, url: urls[i] }));
    }),
});
