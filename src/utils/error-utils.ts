import { createEffect } from 'solid-js';

import type { UseTRPCMutationResult, UseTRPCQueryResult } from 'solid-trpc/dist/shared';

export const handleMutationAndQueryErrors = (
  mutationOrQueryArray: UseTRPCMutationResult<any, any, any, any>[] | UseTRPCQueryResult<any, any>[],
) => {
  createEffect(() => {
    mutationOrQueryArray.forEach((item) => {
      if (item.error) {
        throw new Error(item.error.message);
      }
    });
  });
};
