import { TRPCError } from '@trpc/server';
import { z } from 'zod';

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
    .query(({ input, ctx }) => {
      return ctx.prisma.photo.findFirst({ where: { id: input.photoId } });
    }),
  deleteById: protectedProcedure
    .input(
      z.object({
        photoId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const photo = await ctx.prisma.photo.findFirst({ where: { id: input.photoId } });

      if (!photo || !photo.taskId) {
        throw new TRPCError({
          message: 'photo not found',
          code: 'NOT_FOUND',
        });
      }

      const awsCaller = awsRouter.createCaller(ctx);

      const filePath = S3PathFactory.taskImage(photo.taskId, photo.name);
      await awsCaller.deleteObject({ filePath });
      return ctx.prisma.photo.delete({ where: { id: input.photoId } });
    }),
  updateDescription: protectedProcedure
    .input(
      z.object({
        photoId: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.photo.update({ where: { id: input.photoId }, data: { description: input.description } });
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

      return ctx.prisma.photo.create({ data: { mimeType, taskId, userId, path, name: fileName } });
    }),
  getSignedPutUrlsByTask: protectedProcedure
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
  getSignedGetUrlsByTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const awsCaller = awsRouter.createCaller(ctx);
      const photos = await ctx.prisma.photo.findMany({
        where: { taskId: input.taskId },
        orderBy: { createdAt: 'asc' },
        include: { user: true },
      });
      const filePaths = photos.map((photo) => photo.path);
      const urls = await awsCaller.signedGetUrls({ filePaths });

      return photos.map((photo, i) => ({ ...photo, url: urls[i] }));
    }),
});
