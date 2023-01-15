import { TaskStatus } from '@prisma/client';
import { For } from 'solid-js';
import { refetchRouteData } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';

import { Select } from '~/components/select';

import type { Component, JSX } from 'solid-js';
import type { TaskWithLinks } from '~/server/db/types/task-types';

type InfoItemProps = { title: string; content: JSX.Element };

const InfoItem: Component<InfoItemProps> = (props) => {
  return (
    <div>
      <div class="underline">{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
};

interface props {
  task: TaskWithLinks;
}

export const InfoSection: Component<props> = (props) => {
  const [_, updateStatus] = createServerAction$(async ({ id, status }: { id: string; status: TaskStatus }) => {
    // await updateTaskStatusById(id, status);

    refetchRouteData(['tasks', { id }]);
  });

  return (
    <div class="bg-cyan-100 border-r-black border-r-2 h-full w-full p-8 flex justify-around flex-col ">
      <div class="text-2xl">{props.task.title}</div>
      <InfoItem title="Description" content={props.task.description} />
      <InfoItem
        title="Linked Material"
        content={
          <>
            <For each={props.task.Links}>
              {(link) => (
                <div>
                  <span class="">{link.info} - </span>
                  <a href={link.link}>{link.link}</a>
                </div>
              )}
            </For>
          </>
        }
      />
      <InfoItem
        title="Status"
        content={
          <Select
            onChange={(evt, val) => {
              const status = val as TaskStatus;
              updateStatus({ id: props.task.id, status });
            }}
            options={Object.keys(TaskStatus).map((status) => ({ value: status, label: status }))}
            value={props.task.status as string}
          />
        }
      />
    </div>
  );
};
