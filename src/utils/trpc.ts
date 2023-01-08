import { QueryClient } from '@tanstack/solid-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCSolid } from 'solid-trpc';

import type { IAppRouter } from '~/server/trpc/router/_app';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCSolid<IAppRouter>();
export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
export const queryClient = new QueryClient();
