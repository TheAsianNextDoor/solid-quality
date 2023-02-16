// import { getSession } from '@auth/solid-start';
import { Show, createEffect } from 'solid-js';
import { useNavigate, useRouteData } from 'solid-start';
// import { createServerData$, redirect } from 'solid-start/server';

// import { authOpts } from '~/routes/api/auth/[...solidauth]';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

export const Protected = (Comp: ProtectedComponent) => {
  const routeData = () => {
    // return createServerData$(
    //   async (_, event) => {
    //     const session = await getSession(event.request, authOpts);
    //     console.log('blah: ', session);
    //     if (!session || !session.user) {
    //       throw redirect('/login');
    //     }
    //     return session;
    //   },
    //   { key: () => ['auth_user'] },
    // );
  };

  return {
    routeData,
    Page: () => {
      // const getSessionQuery = useRouteData<typeof routeData>();
      const getSessionQuery = trpcClient.session.get.useQuery();

      const nav = useNavigate();

      createEffect(() => {
        if (getSessionQuery.isSuccess && !getSessionQuery.data?.user?.id) {
          nav('/login');
        }
      });

      return (
        <Show when={getSessionQuery?.isSuccess}>
          <Comp session={getSessionQuery.data} />
        </Show>
      );
    },
  };
};

interface session {
  session:
    | {
        expires: string | undefined;
        user: {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
          id?: string | undefined;
        };
      }
    | undefined;
}

type ProtectedComponent = Component<session>;
