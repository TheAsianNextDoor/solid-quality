import { For, Show } from 'solid-js';
import { useNavigate } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { ProgressiveImg } from '~/components/progressive-img';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface Props {
  taskId: string;
}

export const PhotoList: Component<Props> = (props) => {
  const signedGetQuery = trpcClient.photo.signedGetUrlsByTask.useQuery(() => ({ taskId: props?.taskId }));
  const nav = useNavigate();

  return (
    <>
      <div class="overflow-y-auto h-1/6 flex items-center flex-col">
        <div class="pt-10 self-start">Taken Photos</div>
        <Show when={signedGetQuery?.data} fallback={<Spinner />}>
          <div class="w-3/4">
            <div class="grid grid-cols-3 items-center gap-4">
              <For each={signedGetQuery.data}>
                {(photo) => (
                  <ProgressiveImg
                    onclick={() => nav(`/photo?taskId=${photo.taskId}&photoId=${photo.id}`)}
                    width={300}
                    height={300}
                    src={photo.url as string}
                  />
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};
