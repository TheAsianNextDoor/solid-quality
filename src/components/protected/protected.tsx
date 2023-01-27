import { getSession } from '@auth/solid-start';
import { Show } from 'solid-js';
import { createServerData$, redirect } from 'solid-start/server';

import { authOpts } from '~/routes/api/auth/[...solidauth]';

import type { Session } from '@auth/core/types';
import type { Component } from 'solid-js';

export const Protected = (Comp: IProtectedComponent) => {
  const routeData = () => {
    return createServerData$(
      async (_, event) => {
        const session = await getSession(event.request, authOpts);
        if (!session || !session.user) {
          throw redirect('/login');
        }
        return session;
      },
      { key: () => ['auth_user'] },
    );
  };

  return {
    routeData,
    Page: () => {
      // const session = useRouteData<typeof routeData>();
      const session = createServerData$(
        async (_, event) => {
          const serverSession = await getSession(event.request, authOpts);
          if (!serverSession || !serverSession.user) {
            throw redirect('/login');
          }
          return serverSession;
        },
        { key: () => ['auth_user'] },
      );

      return (
        <Show when={session()} keyed>
          {(sess) => <Comp {...sess} />}
        </Show>
      );
    },
  };
};

type IProtectedComponent = Component<Session>;
