import { initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';

import type { IContext } from './context';

export const t = initTRPC.context<IContext>().create({
  transformer: SuperJSON,
});
