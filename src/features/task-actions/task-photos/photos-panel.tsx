import { LinearProgress } from '@suid/material';
import { Show, createSignal } from 'solid-js';
import { createServerAction$ } from 'solid-start/server';

import { PhotoList } from './photo-list';
import { Button } from '~/components/lib/button';
import { AWS_SDK } from '~/utils/aws-sdk';

import type { Component } from 'solid-js';
import type { TaskWithLinks } from '~/server/db/types/task-types';

interface props {
  task: TaskWithLinks;
}

const user = 'aaron';

export const PhotosPanel: Component<props> = (props) => {
  const [selectedFiles, setSelectedFiles] = createSignal<FileList>();
  const [progress, setProgress] = createSignal(0);

  const [uploadUrl, getUploadUrl] = createServerAction$(async (params: string[]) => {
    return AWS_SDK.s3.generatePreSignedPutUrl(params);
  });

  const photoSelectHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setProgress(0);

    if (target.files) {
      setSelectedFiles(target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles() && !selectedFiles()?.length) {
      return;
    }

    const fileList = selectedFiles() as FileList;
    const uploadArray = [];

    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList.item(i) as File;

      uploadArray[i] = `images/${user}/${file.name}`;
    }

    await getUploadUrl(uploadArray);

    const signedUrls = uploadUrl.result as string[];
    signedUrls.forEach((url, i) => fetch(url, { method: 'PUT', body: fileList[i] }));
  };

  return (
    <>
      <div>Upload a Photo</div>
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
      <div>
        <PhotoList />
      </div>
    </>
  );
};
