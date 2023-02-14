import { trpcClient } from '~/utils/trpc';

import { invalidateQuery } from './request-utils';

export const photoResource = {
  queries: {
    useGetSignedGetUrlsByTask: (params: () => { taskId: string }) => {
      return trpcClient.photo.getSignedGetUrlsByTask.useQuery(params);
    },
    useGetSignedPutUrlsByTask: (
      params: () => {
        taskId: string;
        fileNames: string[];
      },
    ) => {
      return trpcClient.photo.getSignedPutUrlsByTask.useQuery(params);
    },
  },
  mutations: {
    useUpdateDescription: () => {
      return trpcClient.photo.updateDescription.useMutation({
        async onSuccess({ taskId }) {
          invalidateQuery(() => ['photo.signedGetUrlsByTask', { taskId }]);
        },
      });
    },
    useDeleteById: () => {
      return trpcClient.photo.deleteById.useMutation({
        onSuccess({ taskId }) {
          invalidateQuery(() => ['photo.signedGetUrlsByTask', { taskId }]);
        },
      });
    },
    useUploadByTask: () => {
      return trpcClient.photo.uploadByTask.useMutation({
        onSuccess({ taskId }) {
          invalidateQuery(() => ['photo.signedGetUrlsByTask', { taskId }]);
        },
      });
    },
  },
};
