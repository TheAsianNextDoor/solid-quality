import { Match, Switch } from 'solid-js';
import { createRouteData, useRouteData } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { Protected } from '~/components/protected';
import { ActionSection } from '~/features/task-actions';
import { InfoSection } from '~/features/task-info';
import { commentResource } from '~/requests/comment-resource';
import { taskResource } from '~/requests/task-resource';

import styles from './styles.module.css';

import type { RouteDataArgs } from 'solid-start';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

export function routeData({ params }: RouteDataArgs) {
  const comments = createRouteData(
    () => {
      return commentResource.queries.useGetByTaskId(() => ({ taskId: params.taskId }));
    },
    {
      key: () => ['comment', params.taskId],
    },
  );

  const task = createRouteData(
    async () => {
      return taskResource.queries.useGetById(() => ({ taskId: params.taskId }));
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
      <Switch fallback={<Spinner />}>
        <Match when={comments()?.isError || task()?.isError}>
          <>Data Loading Error</>
        </Match>
        <Match when={comments()?.isSuccess && task()?.isSuccess}>
          <div class={`${styles.grid} min-h-screen w-full`}>
            <InfoSection task={task()?.data as TaskWithLinks} />
            <ActionSection task={task()?.data as TaskWithLinks} comments={comments()?.data as CommentWithUser[]} />
          </div>
        </Match>
      </Switch>
    </>
  );
});

export default Page;
