import { FileUpload } from '~/components/file-upload';
import { photoResource } from '~/requests/photo-resource';

import type { Component } from 'solid-js';

interface props {
  taskId: string;
}

export const PhotoUpload: Component<props> = (props) => {
  const uploadPhotoMutation = photoResource.mutations.useUploadByTask();
  const signedPutQuery = photoResource.queries.useGetSignedPutUrlsByTask;

  return (
    <FileUpload
      saveToDB={(params: { mimeType: string; fileName: string }) =>
        uploadPhotoMutation.mutate({ taskId: props.taskId, ...params })
      }
      getSignedPutUrlsFunction={signedPutQuery}
      queryProps={{ taskId: props.taskId }}
      fileTypes="image/*"
    />
  );
};
