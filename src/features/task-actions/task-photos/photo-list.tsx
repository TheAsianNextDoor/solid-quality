import { For } from 'solid-js';
import { useNavigate, useSearchParams } from 'solid-start';

import { ProgressiveImg } from '~/components/progressive-img';
import { wait } from '~/utils/time-utils';

import type { Component } from 'solid-js';
import type { PhotoWithUrl } from '~/server/db/types/photo-types';

interface Props {
  taskId: string;
  photos: PhotoWithUrl[];
}

export const PhotoList: Component<Props> = (props) => {
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
      <div class="w-3/4">
        <div class="grid grid-cols-3 items-center gap-4">
          <For each={props.photos}>
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
    </div>
  );
};
