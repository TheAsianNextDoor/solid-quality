import { For, Show } from 'solid-js';

import { Spinner } from '~/components/lib/spinner';
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
    <>
      <div class="pt-10">Taken Photos</div>
      <Show when={getImagesQuery?.data} fallback={<Spinner />}>
        <For each={getImagesQuery.data}>{(url) => <img src={url as string} />}</For>
      </Show>
    </>
  );
};
