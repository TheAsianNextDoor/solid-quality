import { QueryClient } from '@tanstack/solid-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCSolid } from 'solid-trpc';

import { clientEnv } from '~/env/client';

import type { IAppRouter } from '~/server/trpc/router/_app';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${clientEnv.WEB_PORT}`;
};

export const trpcClient = createTRPCSolid<IAppRouter>();
export const trpcContext = trpcClient.useContext();
export const TrpcProvider = trpcClient.Provider;
export const client = trpcClient.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
export const queryClient = new QueryClient();
