import { trpcClient } from '~/utils/trpc';

import { invalidateQuery } from './request-utils';

export const attachmentResource = {
  queries: {
    useGetSignedGetUrlsByTask: (params: () => { taskId: string }) => {
      return trpcClient.attachment.getSignedGetUrlsByTask.useQuery(params);
    },
    useGetSignedPutUrlsByTask: (
      params: () => {
        taskId: string;
        fileNames: string[];
      },
    ) => {
      return trpcClient.attachment.getSignedPutUrlsByTask.useQuery(params);
    },
    useGetSignedGetUrlById: (
      params: () => {
        attachmentId: string;
      },
    ) => {
      return trpcClient.attachment.getSignedGetUrlsById.useQuery(params);
    },
  },
  mutations: {
    useUploadByTask: () => {
      return trpcClient.attachment.uploadByTask.useMutation({
        onSuccess({ taskId }) {
          invalidateQuery(() => ['attachment.signedGetUrlsByTask', { taskId }]);
        },
      });
    },
  },
};
