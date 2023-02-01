import { attachmentRouter } from './attachment-router';
import { awsRouter } from './aws-router';
import { commentRouter } from './comment-router';
import { photoRouter } from './photo-router';
import { sessionRouter } from './session-router';
import { taskRouter } from './task-router';
import { router } from '../utils';

export const appRouter = router({
  attachment: attachmentRouter,
  aws: awsRouter,
  comment: commentRouter,
  photo: photoRouter,
  session: sessionRouter,
  task: taskRouter,
});

export type IAppRouter = typeof appRouter;
