import { TaskStatus } from '@prisma/client';
import { For } from 'solid-js';
import { refetchRouteData, useRouteData } from 'solid-start';
import { createServerAction$, createServerData$ } from 'solid-start/server';

import { Typography } from 'components/lib/typography';
import { Select } from 'components/select';
import { prisma } from 'db';
import { updateStatusById } from 'db/task';
import { InfoSection, ActionSection } from 'features/inspection-edit';

import styles from './inspection.module.css';

export function routeData() {
  const tasks = createServerData$(async () =>
    prisma.task.findMany({
      include: { Links: true },
    }),
  );

  return { tasks };
}

export default function InspectionEdit() {
  const { tasks } = useRouteData<typeof routeData>();

  const orderedTasks = () =>
    tasks()
      ?.slice()
      .sort((a, b) => a.order - b.order);

  const [_, updateStatus] = createServerAction$(async ({ id, status }: { id: string; status: TaskStatus }) => {
    await updateStatusById(id, status);

    refetchRouteData(['tasks', { id }]);
  });

  return (
    <>
      {
        <For each={orderedTasks()}>
          {(task) => (
            <div class="bg-cyan-700 h-40 m-7 text-white flex justify-between">
              <Typography class="pl-10 pt-5" variant="h4">
                {task.title}
              </Typography>
              <Select
                class="self-center pr-7"
                onChange={(evt, val) => {
                  const status = val as TaskStatus;
                  updateStatus({ id: task.id, status });
                }}
                options={Object.keys(TaskStatus).map((status) => ({ value: status, label: status }))}
                value={task.status as string}
              />
            </div>
          )}
        </For>
      }
      {/* <For each={orderedTasks()}>
        {(task) => (
          <div class="my-5 bg-gray-100">
            <div class={styles.grid}>
              <InfoSection task={task} />
              <ActionSection />
            </div>
          </div>
        )}
      </For> */}
    </>
  );
}
