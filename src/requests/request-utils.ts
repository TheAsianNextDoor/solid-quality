import { queryClient } from '~/utils/trpc';

export const invalidateQuery = async (queryKey: () => [string, Record<string, unknown>]) => {
  await queryClient.invalidateQueries({
    // @ts-ignore need to override readyOnly value
    queryKey,
  });
};
