import { For, Show } from 'solid-js';
import { useNavigate, useSearchParams } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { ProgressiveImg } from '~/components/progressive-img';
import { photoResource } from '~/requests/photo-resource';
import { wait } from '~/utils/time-utils';

import type { Component } from 'solid-js';

interface Props {
  taskId: string;
}

export const PhotoList: Component<Props> = (props) => {
  const photosWithSignedUrlQuery = photoResource.queries.useGetSignedGetUrlsByTask(() => ({ taskId: props.taskId }));

  const nav = useNavigate();
  const [_, setSearchParam] = useSearchParams();

  const handleClick = async (taskId: string, photoId: string) => {
    setSearchParam({ tab: 'photos' });
    await wait(1);
    nav(`/photo?taskId=${taskId}&photoId=${photoId}`);
  };

  return (
    <div class="flex h-1/6 flex-col items-center overflow-y-auto">
      <div class="self-start pt-10">Taken Photos</div>
      <Show when={photosWithSignedUrlQuery.isSuccess} fallback={<Spinner />}>
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
  );
};
