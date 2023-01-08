import { For, Show } from 'solid-js';
import { createServerData$ } from 'solid-start/server';

import { Spinner } from '~/components/lib/spinner';
import { AWS_SDK } from '~/utils/aws-sdk';

export const PhotoList = () => {
  const images = createServerData$(
    ({ folderPath }) => {
      return AWS_SDK.s3.generatePreSignedGetUrlFromFolder(folderPath);
    },
    {
      key: () => ({
        folderPath: 'images/aaron',
      }),
    },
  );

  return (
    <>
      <div class="pt-10">Taken Photos</div>
      <Show when={images()} fallback={<Spinner />}>
        <For each={images()}>{(url) => <img src={url as string} />}</For>
      </Show>
    </>
  );
};
