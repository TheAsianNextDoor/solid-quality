import { router } from '../utils';
import { commentRouter } from './comment-router';
import { taskRouter } from './task-router';

export const appRouter = router({
  comment: commentRouter,
  task: taskRouter,
});

export type IAppRouter = typeof appRouter;
