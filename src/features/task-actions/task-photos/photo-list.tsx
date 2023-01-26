import { For, Show } from 'solid-js';
import { useNavigate, useSearchParams } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { ProgressiveImg } from '~/components/progressive-img';
import { wait } from '~/utils/time-utils';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface Props {
  taskId: string;
}

export const PhotoList: Component<Props> = (props) => {
  const photosWithSignedUrlQuery = trpcClient.photo.signedGetUrlsByTask.useQuery(() => ({ taskId: props?.taskId }));
  const nav = useNavigate();
  const [_, setSearchParam] = useSearchParams();

  const handleClick = async (taskId: string, photoId: string) => {
    setSearchParam({ tab: 'photos' });
    await wait(1);
    nav(`/photo?taskId=${taskId}&photoId=${photoId}`);
  };

  return (
    <>
      <div class="overflow-y-auto h-1/6 flex items-center flex-col">
        <div class="pt-10 self-start">Taken Photos</div>
        <Show when={photosWithSignedUrlQuery?.data} fallback={<Spinner />}>
          <div class="w-3/4">
            <div class="grid grid-cols-3 items-center gap-4">
              <For each={photosWithSignedUrlQuery.data}>
                {(photo) => (
                  <ProgressiveImg
                    onclick={() => handleClick(photo.taskId as string, photo.id)}
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
