import { trpcClient } from '~/utils/trpc';

import { invalidateQuery } from './request-utils';

export const taskResource = {
  queries: {
    useGetById: (params: () => { taskId: string }) => {
      return trpcClient.task.byId.useQuery(params);
    },
    useGetTasksByInspection: (params: () => { inspectionId: string }) => {
      return trpcClient.task.getTasksByInspection.useQuery(params);
    },
  },
  mutations: {
    useUpdateTaskStatus: () => {
      return trpcClient.task.updateTaskStatus.useMutation({
        onSuccess({ id }) {
          invalidateQuery(() => ['task.byId', { id }]);
          invalidateQuery(() => ['task.getTasksByInspection', { id }]);
        },
      });
    },
  },
};
