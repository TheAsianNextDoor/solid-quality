import { t } from '../utils';
import { addRouter, commentRouter } from './comment';
import exampleRouter from './example';
import { taskRouter } from './task';

export const appRouter = t.mergeRouters(exampleRouter, commentRouter, taskRouter, addRouter);

export type IAppRouter = typeof appRouter;
