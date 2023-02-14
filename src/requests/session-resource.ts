import { trpcClient } from '~/utils/trpc';

export const sessionResource = {
  queries: {
    useUserId: () => {
      return trpcClient.session.userId.useQuery();
    },
  },
  mutation: {},
};
