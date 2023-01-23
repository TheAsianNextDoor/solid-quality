import { z } from 'zod';

import { protectedProcedure, router } from '~/server/trpc/utils';
import { AWS_SDK } from '~/utils/aws-sdk';

export const awsRouter = router({
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
