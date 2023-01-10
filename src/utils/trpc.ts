import { QueryClient } from '@tanstack/solid-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import IsomorphicWebSocket from 'isomorphic-ws';
import { createTRPCSolid } from 'solid-trpc';

import { clientEnv } from '~/env/client';

import type { IAppRouter } from '~/server/trpc/router/_app';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return `http://localhost:${clientEnv.WEB_PORT}`;
};

const WebSocketImpl = IsomorphicWebSocket as unknown as typeof WebSocket;

const wsClient = createWSClient({
  WebSocket: WebSocketImpl,
  url: `ws://localhost:${clientEnv.WEB_WS_PORT}`,
});

export const trpc = createTRPCSolid<IAppRouter>();
export const trpcContext = trpc.useContext();
export const client = trpc.createClient({
  links: [
    splitLink({
      condition(op) {
        // console.log('haha: ', op);
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    }),
  ],
});
export const queryClient = new QueryClient();
