import { For, Show } from 'solid-js';

import { Spinner } from '~/components/lib/spinner';
import { ProgressiveImg } from '~/components/progressive-img';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface Props {
  taskId: string;
}

export const PhotoList: Component<Props> = (props) => {
  const getImagesQuery = trpcClient.aws.getTaskImageUrls.useQuery(() => ({ taskId: props.taskId }), {
    refetchOnWindowFocus: false,
    queryKey: () => ['aws.getTaskImageUrls', { taskId: props.taskId }],
  });

  return (
    <div class="overflow-y-auto h-1/6 flex items-center flex-col">
      <div class="pt-10 self-start">Taken Photos</div>
      <Show when={getImagesQuery?.data} fallback={<Spinner />}>
        <div class="w-3/4">
          <div class="grid grid-cols-3 items-center gap-4">
            <For each={getImagesQuery.data}>
              {(url) => <ProgressiveImg width={300} height={300} src={url as string} />}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};
