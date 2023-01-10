import { QueryClient } from '@tanstack/solid-query';
import { createWSClient, httpBatchLink, wsLink } from '@trpc/client';
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
export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
    wsLink({
      client: wsClient,
    }),
  ],
});
export const queryClient = new QueryClient();
