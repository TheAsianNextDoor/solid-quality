import { For } from 'solid-js';
import { createRouteData, useNavigate, useRouteData } from 'solid-start';

import { Typography } from '~/components/lib/typography';
import { Protected } from '~/components/protected';
import { TaskStatusSelect } from '~/components/task-status-select';
import { taskResource } from '~/requests/task-resource';

import type { RouteDataArgs } from 'solid-start';

export function routeData({ params }: RouteDataArgs) {
  const tasks = createRouteData(
    async () => {
      return taskResource.queries.useGetTasksByInspection(() => ({ inspectionId: params.inspectionId }));
    },
    { key: () => ['inspection', params.inspectionId] },
  );

  return { tasks };
}

const { Page } = Protected(() => {
  const { tasks } = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  const orderedTasks = () =>
    tasks()
      ?.data?.slice()
      ?.sort((a, b) => a.order - b.order);

  return (
    <>
      {
        <For each={orderedTasks()}>
          {(task) => (
            <div class="m-7 flex h-40 items-center justify-between bg-cyan-700 p-7 text-white">
              <div class="flex flex-col justify-center">
                <div>
                  <Typography
                    width="min-content"
                    class="cursor-pointer hover:underline"
                    variant="h4"
                    onClick={() => navigate(`/task/${task.id}`)}
                  >
                    {task.title}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6">{task.description}</Typography>
                </div>
              </div>
              <TaskStatusSelect taskStatus={task.status} taskId={task.id} />
            </div>
          )}
        </For>
      }
    </>
  );
});

export default Page;
