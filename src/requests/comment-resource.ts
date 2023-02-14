import { trpcClient } from '~/utils/trpc';

export const commentResource = {
  queries: {
    useGetByTaskId: (params: () => { taskId: string }) => {
      return trpcClient.comment.getByTaskId.useQuery(params);
    },
  },
  mutations: {
    useCreateComment: () => {
      return trpcClient.comment.create.useMutation();
    },
    useUserTyping: () => {
      return trpcClient.comment.userTyping.useMutation();
    },
  },
};
