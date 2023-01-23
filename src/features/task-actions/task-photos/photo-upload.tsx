import { LinearProgress } from '@suid/material';
import { Show, createSignal } from 'solid-js';

import { Button } from '~/components/lib/button';
import { wait } from '~/utils/time-utils';
import { queryClient, trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface props {
  taskId: string;
}

export const PhotoUpload: Component<props> = (props) => {
  const [selectedFiles, setSelectedFiles] = createSignal<FileList>();
  const [progress, setProgress] = createSignal(0);

  let inputRef: HTMLInputElement;

  const uploadPhotoMutation = trpcClient.photo.uploadByTask.useMutation();

  const fileNames = () => {
    if (!selectedFiles()?.length) return [];

    const uploadArray = [];
    const fileList = selectedFiles() as FileList;

    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList.item(i) as File;

      uploadArray[i] = file.name;
    }

    return uploadArray;
  };

  const signedPutQuery = trpcClient.photo.signedPutUrlsByTask.useQuery(
    () => ({
      taskId: props.taskId,
      fileNames: fileNames(),
    }),
    {
      enabled: false,
    },
  );

  const photoSelectHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setProgress(0);

    if (target.files) {
      setSelectedFiles(target.files);
    }
  };

  const handleUpload = async () => {
    await signedPutQuery.refetch();

    const signedUrls = signedPutQuery.data as string[];
    const files = selectedFiles() as FileList;

    const urlPromises = signedUrls.map(async (url, i) => {
      const file = files[i];

      await wait(i);

      try {
        await fetch(url, { method: 'PUT', body: file });
        uploadPhotoMutation.mutate({ taskId: props.taskId, mimeType: file.type, fileName: file.name });
        inputRef.value = '';
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    await Promise.all(urlPromises);

    // @ts-ignore bad types
    queryClient.invalidateQueries({ queryKey: () => ['photo.signedGetUrlsByTask', { taskId: props.taskId }] });
  };

  return (
    <>
      <div>
        {/** @ts-ignore ref assignment */}
        <input ref={inputRef} type="file" accept="image/*" multiple name="photoUpload" onChange={photoSelectHandler} />
      </div>
      <Show when={progress() !== 0}>
        <LinearProgress variant="determinate" value={progress()} />
      </Show>
      <div class="pt-5">
        <Button variant="contained" onClick={handleUpload} disabled={!selectedFiles()?.length}>
          Upload Photo
        </Button>
      </div>
    </>
  );
};
