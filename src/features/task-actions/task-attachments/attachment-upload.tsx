import { FileUpload } from '~/components/file-upload';
import { queryClient, trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';

interface props {
  taskId: string;
}

export const AttachmentUpload: Component<props> = (props) => {
  const uploadAttachmentMutation = trpcClient.attachment.uploadByTask.useMutation();
  const signedPutQuery = trpcClient.attachment.signedPutUrlsByTask;
  const invalidateQuery = () =>
    // @ts-ignore bad types
    queryClient.invalidateQueries({ queryKey: () => ['attachment.signedGetUrlsByTask', { taskId: props.taskId }] });

  return (
    <FileUpload
      saveToDB={(params: { mimeType: string; fileName: string }) =>
        uploadAttachmentMutation.mutate({ taskId: props.taskId, ...params })
      }
      signedUrlFunction={signedPutQuery}
      queryProps={{ taskId: props.taskId }}
      invalidateQuery={invalidateQuery}
      fileTypes="application/pdf"
    />
  );
};
