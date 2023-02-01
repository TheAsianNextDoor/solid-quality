import { getSession } from '@auth/solid-start';
import { signIn, signOut } from '@auth/solid-start/client';
import { Switch, Match } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { authOpts } from '~/routes/api/auth/[...solidauth]';
import { trpcClient } from '~/utils/trpc';

import type { VoidComponent } from 'solid-js';

export const routeData = () => {
  return createServerData$(async (_, { request }) => {
    return getSession(request, authOpts);
  });
};

const Home: VoidComponent = () => {
  const session = useRouteData<typeof routeData>();
  const res = trpcClient.session.get.useQuery(undefined, {
    get enabled() {
      return !!session()?.user;
    },
  });

  return (
    <>
      <Title>Create JD App</Title>
      <div>
        <Switch fallback={<pre class="text-2xl font-bold text-gray-500">{JSON.stringify(res.data, null, 2)}</pre>}>
          <Match when={res.isLoading}>
            <div class="text-2xl font-bold text-gray-500">{res.isFetching ? 'Loading' : 'Not Logged In'}</div>
          </Match>
        </Switch>
        <Switch
          fallback={
            <>
              <button
                onClick={() => signIn('github')}
                class="m-3 flex w-56 items-center justify-center rounded-lg bg-purple-700 p-2.5 font-bold text-white"
              >
                Login Github
              </button>
              <button
                onClick={() => signIn('google')}
                class="m-3 flex w-56 items-center justify-center rounded-lg bg-purple-700 p-2.5 font-bold text-white"
              >
                Login Google
              </button>
            </>
          }
        >
          <Match when={session.loading}>
            <h1>Loading session</h1>
          </Match>
          <Match when={session()}>
            <button
              onClick={() => signOut()}
              class="m-3 flex w-56 items-center justify-center rounded-lg bg-purple-700 p-2.5 font-bold text-white"
            >
              Logout
            </button>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;
