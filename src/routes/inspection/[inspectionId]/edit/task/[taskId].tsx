import { Show } from 'solid-js';
import { createRouteData, useParams, useRouteData } from 'solid-start';

import { ActionSection } from '~/features/task-actions';
import { InfoSection } from '~/features/task-info';
import { trpcClient } from '~/utils/trpc';

import type { routeDataReturn } from '../../edit';
import type { RouteDataArgs } from 'solid-start';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

import styles from './styles.module.css';

export function routeData({ data, params }: RouteDataArgs<routeDataReturn>) {
  const comments = createRouteData(() => {
    return trpcClient.comment.getByTaskId.useQuery(() => ({ taskId: params.taskId }), {
      queryKey: () => ['comment.getByTaskId', { taskId: params.taskId }],
    });
  });

  return {
    ...data,
    comments,
  };
}

export default function EditTaskActions() {
  const { tasks, comments } = useRouteData<typeof routeData>();
  const { taskId } = useParams();

  const selectedId = () => tasks()?.data?.findIndex((task) => task.id === taskId);
  const selectedTask = () => tasks()?.data?.[selectedId() as number];

  return (
    <>
      <Show when={!!comments()?.data && !!tasks()?.data} fallback={<>Loading...</>}>
        <div class={`${styles.grid} w-full min-h-screen`}>
          <InfoSection task={selectedTask() as TaskWithLinks} />
          <ActionSection task={selectedTask() as TaskWithLinks} comments={comments()?.data as CommentWithUser[]} />
        </div>
      </Show>
    </>
  );
}
