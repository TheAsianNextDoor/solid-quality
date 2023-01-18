import { mount, StartClient } from 'solid-start/entry-client';

import { client, TrpcProvider, queryClient } from './utils/trpc';

mount(
  () => (
    <TrpcProvider client={client} queryClient={queryClient}>
      <StartClient />
    </TrpcProvider>
  ),
  document,
);
