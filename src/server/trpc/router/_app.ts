import { awsRouter } from './aws-router';
import { commentRouter } from './comment-router';
import { sessionRouter } from './session-router';
import { taskRouter } from './task-router';
import { router } from '../utils';

export const appRouter = router({
  comment: commentRouter,
  task: taskRouter,
  session: sessionRouter,
  aws: awsRouter,
});

export type IAppRouter = typeof appRouter;
