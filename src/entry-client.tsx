import { mount, StartClient } from 'solid-start/entry-client';

import { client, Provider, queryClient } from './utils/trpc';

mount(
  () => (
    <Provider client={client} queryClient={queryClient}>
      <StartClient />
    </Provider>
  ),
  document,
);
