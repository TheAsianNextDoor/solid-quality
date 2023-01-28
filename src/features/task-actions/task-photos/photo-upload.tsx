import { FileUpload } from '~/components/file-upload';
import { queryClient, trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface props {
  taskId: string;
}

export const PhotoUpload: Component<props> = (props) => {
  const uploadPhotoMutation = trpcClient.photo.uploadByTask.useMutation();
  const signedPutQuery = trpcClient.photo.signedPutUrlsByTask;
  const invalidateQuery = () =>
    // @ts-ignore bad types
    queryClient.invalidateQueries({ queryKey: () => ['photo.signedGetUrlsByTask', { taskId: props.taskId }] });

  return (
    <FileUpload
      saveToDB={(params: { mimeType: string; fileName: string }) =>
        uploadPhotoMutation.mutate({ taskId: props.taskId, ...params })
      }
      signedUrlFunction={signedPutQuery}
      queryProps={{ taskId: props.taskId }}
      invalidateQuery={invalidateQuery}
      fileTypes="image/*"
    />
  );
};
