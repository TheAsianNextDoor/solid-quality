import { Show } from 'solid-js';
import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { ActionSection } from 'features/task-actions';
import { InfoSection } from 'features/task-info';
import { getCommentsByTaskId } from 'server/comment/comment-service';

import styles from './styles.module.css';

import type { routeDataReturn } from '../../edit';
import type { CommentWithUser } from 'server/comment/comment-types';
import type { TaskWithLinks } from 'server/task/task-types';
import type { RouteDataArgs } from 'solid-start';

export function routeData({ data, params }: RouteDataArgs<routeDataReturn>) {
  const comments = createServerData$(({ taskId }) => getCommentsByTaskId(taskId), {
    key: () => ({
      taskId: params.taskId,
    }),
  });

  return {
    ...data,
    comments,
  };
}

export default function EditTaskActions() {
  const { tasks, comments } = useRouteData<typeof routeData>();
  const { taskId } = useParams();

  const selectedId = () => tasks()?.findIndex((task) => task.id === taskId);
  const selectedTask = () => tasks()?.[selectedId() as number];

  return (
    <>
      <Show when={!!comments() && !!tasks()} fallback={<>Loading...</>}>
        <div class={`${styles.grid} w-full min-h-screen`}>
          <InfoSection task={selectedTask() as TaskWithLinks} />
          <ActionSection task={selectedTask() as TaskWithLinks} comments={comments() as CommentWithUser[]} />
        </div>
      </Show>
    </>
  );
}
