import { TaskStatus } from '@prisma/client';
import { Modal } from '@suid/material';
import { createSignal, For } from 'solid-js';
import { refetchRouteData, useRouteData } from 'solid-start';
import { createServerAction$, createServerData$ } from 'solid-start/server';

import { Typography } from 'components/lib/typography';
import { Select } from 'components/select';
import { prismaInstance } from 'db';
import { updateStatusById } from 'db/task';
import { InspectionModal } from 'features/inspection-modal';

export function routeData() {
  const tasks = createServerData$(async () =>
    prismaInstance.task.findMany({
      include: { Links: true },
    }),
  );

  return { tasks };
}

export default function InspectionEdit() {
  const { tasks } = useRouteData<typeof routeData>();
  const [open, setOpen] = createSignal(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = createSignal(0);

  const handleOpenModal = (index: number) => {
    setSelectedTaskIndex(index);
    setOpen(true);
  };
  const handleCloseModal = () => setOpen(false);

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
          {(task, index) => (
            <div class="bg-cyan-700 h-40 m-7 text-white flex justify-between">
              <Typography onClick={() => handleOpenModal(index())} class="pl-10 pt-5 cursor-pointer" variant="h4">
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
      <Modal open={open()} onClose={handleCloseModal}>
        <InspectionModal tasks={orderedTasks()} selectedTaskIndex={selectedTaskIndex()} />
      </Modal>
    </>
  );
}
