import { LinearProgress } from '@suid/material';
import { Show, createSignal } from 'solid-js';

import { Button } from '~/components/lib/button';
import { queryClient, trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface props {
  taskId: string;
}

export const PhotoUpload: Component<props> = (props) => {
  const [selectedFiles, setSelectedFiles] = createSignal<FileList>();
  const [progress, setProgress] = createSignal(0);

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

  const uploadUrlQuery = trpcClient.aws.getTaskPhotoUploadUrls.useQuery(
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
    await uploadUrlQuery.refetch();

    const signedUrls = uploadUrlQuery.data as string[];
    const files = selectedFiles() as FileList;

    const urlPromises = signedUrls.map((url, i) => fetch(url, { method: 'PUT', body: files[i] }));

    await Promise.all(urlPromises);

    // @ts-ignore bad types
    queryClient.invalidateQueries({ queryKey: () => ['aws.getTaskImageUrls', { taskId: props.taskId }] });
  };

  return (
    <>
      <div>
        <input type="file" accept="image/*" multiple name="photoUpload" onChange={photoSelectHandler} />
      </div>
      <Show when={progress() !== 0}>
        <LinearProgress variant="determinate" value={progress()} />
      </Show>
      <div class="pt-5">
        <Button variant="contained" onClick={handleUpload}>
          Upload Photo
        </Button>
      </div>
    </>
  );
};