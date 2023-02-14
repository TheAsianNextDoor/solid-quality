import { trpcClient } from '~/utils/trpc';

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
      return trpcClient.task.updateTaskStatus.useMutation();
    },
  },
};
