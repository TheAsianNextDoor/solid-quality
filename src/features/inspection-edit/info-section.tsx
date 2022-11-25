import { Prisma } from '@prisma/client';
import { Component } from 'solid-js';

const taskWithLinksValidator = Prisma.validator<Prisma.TaskArgs>()({
  include: { Links: true },
});
type TaskWithLinks = Prisma.TaskGetPayload<typeof taskWithLinksValidator>;

type InfoItemProps = { title: string; content: string | Node };

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
        content={props.task?.Links?.map(({ info, link }, idx) => (
          <div>
            <span class="">{info} - </span>
            <a href={link}>{link}</a>
          </div>
        ))}
      />
      <InfoItem title="Status" content={props.task.status} />
    </div>
  );
};
