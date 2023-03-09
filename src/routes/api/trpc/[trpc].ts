import { createSolidAPIHandler } from 'solid-start-trpc';

import { createContext } from '~/server/trpc/context';
import { appRouter } from '~/server/trpc/router/_app';

import type { IAppRouter } from '~/server/trpc/router/_app';

const handler = createSolidAPIHandler<IAppRouter>({
  router: appRouter,
  createContext,
  // responseMeta: ({ errors }) => {
  //   console.log('meta: ', errors);
  //   if (errors) {
  //     return { status: 307, headers: { Location: '/login' } };
  //   }

  //   return {};
  // },
});

export const GET = handler;
export const POST = handler;
