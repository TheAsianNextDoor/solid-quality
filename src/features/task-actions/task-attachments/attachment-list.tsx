import { For } from 'solid-js';
import { useNavigate, useSearchParams } from 'solid-start';

import PDFIcon from '~/assets/pdf-icon.png';
import { wait } from '~/utils/time-utils';

import type { Component } from 'solid-js';
import type { AttachmentWithUrl } from '~/server/prisma/types/attachment-types';

interface Props {
  taskId: string;
  attachments: AttachmentWithUrl[];
}

export const AttachmentList: Component<Props> = (props) => {
  const nav = useNavigate();
  const [_, setSearchParam] = useSearchParams();

  const handleClick = async (taskId: string, attachmentId: string) => {
    setSearchParam({ tab: 'attachments' });
    await wait(1);
    nav(`/attachment?taskId=${taskId}&attachmentId=${attachmentId}`);
  };

  return (
    <>
      <div class="flex h-5/6 flex-col items-center overflow-y-auto">
        <div class="self-start pt-10">Attachments</div>
        <div class="w-3/4">
          <div class="grid grid-cols-3 items-center gap-4">
            <For each={props.attachments}>
              {(attachment) => (
                <div onClick={() => handleClick(attachment.taskId as string, attachment.id)}>
                  <img class="cursor-pointer" src={PDFIcon} />
                </div>
                // <ProgressiveImg
                //   onclick={() => handleClick(photo.taskId as string, photo.id)}
                //   width={300}
                //   height={300}
                //   src={photo.url as string}
                // />
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  );
};
