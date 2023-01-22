import { PhotoList } from './photo-list';
import { PhotoUpload } from './photo-upload';

import type { Component } from 'solid-js';
import type { TaskWithLinks } from '~/server/db/types/task-types';

interface props {
  task: TaskWithLinks;
}

export const PhotosPanel: Component<props> = (props) => {
  return (
    <>
      <div>Upload a Photo</div>
      <div>
        <PhotoUpload taskId={props.task.id} />
      </div>
      <div>
        <PhotoList taskId={props.task.id} />
      </div>
    </>
  );
};
