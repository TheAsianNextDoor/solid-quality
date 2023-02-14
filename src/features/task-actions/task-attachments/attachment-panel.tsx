import { AttachmentList } from './attachment-list';
import { AttachmentUpload } from './attachment-upload';

import type { Component } from 'solid-js';
import type { AttachmentWithUrl } from '~/server/db/types/attachment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

interface props {
  task: TaskWithLinks;
  attachments: AttachmentWithUrl[];
}

export const AttachmentPanel: Component<props> = (props) => {
  return (
    <>
      <AttachmentUpload taskId={props.task.id} />
      <AttachmentList taskId={props.task.id} attachments={props.attachments} />
    </>
  );
};
