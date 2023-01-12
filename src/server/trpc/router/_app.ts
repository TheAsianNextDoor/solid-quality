import { t } from '../utils';
import { commentRouter } from './comment';
import exampleRouter from './example';
import { taskRouter } from './task';

export const appRouter = t.mergeRouters(exampleRouter, commentRouter, taskRouter);

export type IAppRouter = typeof appRouter;
