import { FileUpload } from '~/components/file-upload';
import { attachmentResource } from '~/requests/attachment-resource';

import type { Component } from 'solid-js';

interface props {
  taskId: string;
}

export const AttachmentUpload: Component<props> = (props) => {
  const uploadAttachment = attachmentResource.mutations.useUploadByTask();
  const signedPutQuery = attachmentResource.queries.useGetSignedPutUrlsByTask;

  return (
    <FileUpload
      saveToDB={(params: { mimeType: string; fileName: string }) =>
        uploadAttachment.mutate({ taskId: props.taskId, ...params })
      }
      getSignedPutUrlsFunction={signedPutQuery}
      queryProps={{ taskId: props.taskId }}
      fileTypes="application/pdf"
    />
  );
};
