import { commentRouter } from './comment-router';
import { taskRouter } from './task-router';
import { router } from '../utils';
import { sessionRouter } from './session-router';

export const appRouter = router({
  comment: commentRouter,
  task: taskRouter,
  session: sessionRouter,
});

export type IAppRouter = typeof appRouter;
