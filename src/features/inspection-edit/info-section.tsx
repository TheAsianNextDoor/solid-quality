import { Prisma, TaskStatus } from '@prisma/client';
import { For } from 'solid-js';
import { createServerData$ } from 'solid-start/server';

import { Select } from 'components/select';
import { prisma } from 'db';

import type { Component, JSX } from 'solid-js';

const taskWithLinksValidator = Prisma.validator<Prisma.TaskArgs>()({
  include: { Links: true },
});
type TaskWithLinks = Prisma.TaskGetPayload<typeof taskWithLinksValidator>;

type InfoItemProps = { title: string; content: JSX.Element };

const updateStatus = (id: string, value: TaskStatus) =>
  createServerData$(() => {
    prisma.task.update({
      where: { id },
      data: {
        status: value,
      },
    });
  });

const InfoItem: Component<InfoItemProps> = (props) => {
  return (
    <div>
      <div class="underline">{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
};

export const InfoSection: Component<{ task: TaskWithLinks }> = (props) => {
  return (
    <div class="bg-cyan-100 border-r-black border-r-2 w-full p-8 flex flex-col gap-3">
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
              updateStatus(props.task.id, val);
              console.log(val);
            }}
            options={Object.keys(TaskStatus).map((status) => ({ value: status, label: status }))}
          />
        }
      />
    </div>
  );
};
