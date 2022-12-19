import { Show } from 'solid-js';
import { useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getCommentsByTaskId } from 'db/comment';
import { TaskModal } from 'features/inspection-modal/inspection-modal';

import type { routeDataReturn } from '../../edit';
import type { Comment } from 'db/comment';
import type { TaskWithLinks } from 'db/task';
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
      <Show when={!!comments()} fallback={<>Loading...</>}>
        <TaskModal task={selectedTask() as TaskWithLinks} comments={comments() as Comment[]} />
      </Show>
    </>
  );
}
