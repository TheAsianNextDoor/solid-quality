import { LinearProgress } from '@suid/material';
import axios from 'axios';
import { For, Show, createSignal } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import { Button } from '~/components/lib/button';
import { handleMutationAndQueryErrors } from '~/utils/error-utils';
import { wait } from '~/utils/time-utils';

import type { Component } from 'solid-js';

interface props {
  saveToDB: any;
  signedUrlFunction: any;
  queryProps: Record<string, unknown>;
  invalidateQuery?: () => void;
  fileTypes?: string;
}

export const FileUpload: Component<props> = (props) => {
  const [selectedFiles, setSelectedFiles] = createSignal<FileList>();
  const [progressStore, setProgressStore] = createStore<{ fileName: string; progress: number }[]>([]);

  let inputRef: HTMLInputElement;

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

  // function is always declarative
  // eslint-disable-next-line solid/reactivity
  const signedPutQuery = props.signedUrlFunction.useQuery(
    () => ({
      ...(props?.queryProps && props.queryProps),
      fileNames: fileNames(),
    }),
    {
      enabled: false,
    },
  );

  handleMutationAndQueryErrors([signedPutQuery]);

  const photoSelectHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;

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

      setProgressStore([]);

      await wait(1);

      try {
        await axios({
          url,
          method: 'PUT',
          data: file,
          onUploadProgress(progressEvent) {
            setProgressStore(
              produce((store) => {
                store[i] = { progress: 0, fileName: '' };
                store[i].progress = (progressEvent.loaded / (progressEvent?.total || 0)) * 100;
                store[i].fileName = file.name;
              }),
            );
          },
        });

        props.saveToDB({ mimeType: file.type, fileName: file.name });
        inputRef.value = '';
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    await Promise.all(urlPromises);

    props?.invalidateQuery?.();
  };

  return (
    <>
      <div>
        <input
          // @ts-ignore ref issues
          ref={inputRef}
          type="file"
          accept={props?.fileTypes || '*'}
          multiple
          name="upload"
          onChange={photoSelectHandler}
        />
      </div>
      <Show when={progressStore.length > 0}>
        <For each={progressStore}>
          {(progressItem) => (
            <>
              <Show when={progressItem?.fileName}>
                <div>{progressItem.fileName}</div>
                <LinearProgress variant="determinate" value={progressItem.progress} />
              </Show>
            </>
          )}
        </For>
      </Show>
      <div class="pt-5">
        <Button variant="contained" onClick={handleUpload} disabled={!selectedFiles()?.length}>
          Upload Photo
        </Button>
      </div>
    </>
  );
};
