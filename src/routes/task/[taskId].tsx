import { Show } from 'solid-js';
import { createRouteData, useRouteData } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { Protected } from '~/components/protected';
import { ActionSection } from '~/features/task-actions';
import { InfoSection } from '~/features/task-info';

import type { RouteDataArgs } from 'solid-start';

import { trpcClient } from '~/utils/trpc';

import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

import styles from './styles.module.css';

export function routeData({ params }: RouteDataArgs) {
  const comments = createRouteData(
    () => {
      return trpcClient.comment.getByTaskId.useQuery(() => ({ taskId: params.taskId }));
    },
    {
      key: () => ['comment', params.taskId],
    },
  );

  const task = createRouteData(
    async () => {
      return trpcClient.task.byId.useQuery(() => ({ taskId: params.taskId }));
    },
    { key: () => ['task', params.taskId] },
  );

  return {
    task,
    comments,
  };
}

const { Page } = Protected(() => {
  const { task, comments } = useRouteData<typeof routeData>();

  return (
    <>
      <Show when={comments()?.isSuccess && task()?.isSuccess} fallback={<Spinner />}>
        <div class={`${styles.grid} w-full min-h-screen`}>
          <InfoSection task={task()?.data as TaskWithLinks} />
          <ActionSection task={task()?.data as TaskWithLinks} comments={comments()?.data as CommentWithUser[]} />
        </div>
      </Show>
    </>
  );
});

export default Page;
