import { signIn, signOut } from '@auth/solid-start/client';
import { Switch, Match } from 'solid-js';
import { Title, useRouteData } from 'solid-start';

import { trpcClient } from '~/utils/trpc';

import type { VoidComponent } from 'solid-js';

export const routeData = () => {
  return trpcClient.session.get.useQuery();
};

const Home: VoidComponent = () => {
  const session = useRouteData<typeof routeData>();

  return (
    <>
      <Title>Create JD App</Title>
      <div>
        <Switch fallback={<div class="text-2xl font-bold text-gray-500">Loading</div>}>
          <Match when={!session.isLoading && !session?.data?.user?.id}>
            <>
              <div class="text-2xl font-bold text-gray-500">Not Logged In</div>

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
            </>
          </Match>
          <Match when={!session.isLoading && session.data?.user?.id}>
            <>
              <pre class="text-2xl font-bold text-gray-500">{JSON.stringify(session.data, null, 2)}</pre>
              <button
                onClick={() => signOut()}
                class="m-3 flex w-56 items-center justify-center rounded-lg bg-purple-700 p-2.5 font-bold text-white"
              >
                Logout
              </button>
            </>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;
