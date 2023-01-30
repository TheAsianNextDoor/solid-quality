import { TaskStatus } from '@prisma/client';
import { For } from 'solid-js';
import { createRouteData, useNavigate, useRouteData } from 'solid-start';

import { Typography } from '~/components/lib/typography';
import { Select } from '~/components/select';
import { trpcClient } from '~/utils/trpc';

import type { RouteDataArgs } from 'solid-start';

export function routeData({ params }: RouteDataArgs) {
  const tasks = createRouteData(
    async () => {
      return trpcClient.task.getTasksByInspection.useQuery(() => ({ inspectionId: params.inspectionId }));
    },
    { key: () => ['inspection', params.inspectionId] },
  );

  return { tasks };
}

export default function InspectionEdit() {
  const { tasks } = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  const orderedTasks = () =>
    tasks()
      ?.data?.slice()
      ?.sort((a, b) => a.order - b.order);

  const { mutate: updateStatus } = trpcClient.task.updateTaskStatus.useMutation();

  return (
    <>
      {
        <For each={orderedTasks()}>
          {(task) => (
            <div class="bg-cyan-700 h-40 p-7 m-7 text-white flex items-center justify-between">
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
              <Select
                onChange={(evt, val) => {
                  const status = val as TaskStatus;
                  updateStatus({ taskId: task.id, status });
                }}
                options={Object.keys(TaskStatus).map((status) => ({ value: status, label: status }))}
                value={task.status as string}
              />
            </div>
          )}
        </For>
      }
    </>
  );
}
