import { For, Show } from 'solid-js';
import { useNavigate, useSearchParams } from 'solid-start';

import PDFIcon from '~/assets/pdf-icon.png';
import { Spinner } from '~/components/lib/spinner';
import { attachmentResource } from '~/requests/attachment-resource';
import { wait } from '~/utils/time-utils';

import type { Component } from 'solid-js';

interface Props {
  taskId: string;
}

export const AttachmentList: Component<Props> = (props) => {
  const attachmentsWithSignedUrl = attachmentResource.queries.useGetSignedGetUrlsByTask(() => ({
    taskId: props?.taskId,
  }));

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
        <Show when={attachmentsWithSignedUrl.isSuccess} fallback={<Spinner />}>
          <div class="w-3/4">
            <div class="grid grid-cols-3 items-center gap-4">
              <For each={attachmentsWithSignedUrl.data}>
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
        </Show>
      </div>
    </>
  );
};
