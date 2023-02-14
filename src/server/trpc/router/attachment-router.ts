import { z } from 'zod';

import { S3PathFactory } from '~/server/utils/s3Paths';

import { awsRouter } from './aws-router';
import { protectedProcedure, router } from '../utils';

export const attachmentRouter = router({
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
      const path = S3PathFactory.taskAttachment(taskId, fileName);

      return ctx.prisma.attachment.create({ data: { userId, mimeType, taskId, path, name: fileName } });
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
      const filePaths = input.fileNames.map((fileName) => S3PathFactory.taskAttachment(input.taskId, fileName));

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
      const attachments = await ctx.prisma.attachment.findMany({
        where: { taskId: input.taskId },
        orderBy: { createdAt: 'asc' },
        include: { user: true },
      });

      const filePaths = attachments.map((attachment) => attachment.path);
      const urls = await awsCaller.signedGetUrls({ filePaths });

      return attachments.map((attachment, i) => ({ ...attachment, url: urls[i] }));
    }),
  getSignedGetUrlsById: protectedProcedure
    .input(
      z.object({
        attachmentId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const awsCaller = awsRouter.createCaller(ctx);

      const attachment = await ctx.prisma.attachment.findFirst({
        where: { id: input.attachmentId },
        include: { user: true },
      });

      const urls = await awsCaller.signedGetUrls({
        filePaths: [attachment?.path || ''],
        getCommandOptions: { ResponseContentType: 'application/pdf' },
      });

      return { ...attachment, url: urls[0] };
    }),
});
