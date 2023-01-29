import { z } from 'zod';

import { protectedProcedure, router } from '~/server/trpc/utils';
import { AWS_SDK } from '~/utils/aws-sdk';

export const awsRouter = router({
  deleteObject: protectedProcedure
    .input(
      z.object({
        filePath: z.string(),
      }),
    )
    .mutation(({ input }) => {
      return AWS_SDK.s3.deleteObject(input.filePath);
    }),
  signedPutUrls: protectedProcedure
    .input(
      z.object({
        filePaths: z.string().array(),
      }),
    )
    .query(({ input }) => {
      return AWS_SDK.s3.generatePreSignedPutUrl(input.filePaths);
    }),
  signedGetUrls: protectedProcedure
    .input(
      z.object({
        filePaths: z.string().array(),
      }),
    )
    .query(({ input }) => {
      return AWS_SDK.s3.generatePreSignedGetUrl(input.filePaths);
    }),
});
