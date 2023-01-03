import { createSignal } from 'solid-js';

import type { TaskWithLinks } from 'server/task/task-types';
import type { Component } from 'solid-js';

interface props {
  task: TaskWithLinks;
}

export const PhotosPanel: Component<props> = (props) => {
  const [selectedFile, setSelectedFile] = createSignal();

  const photoSelectHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;

    setSelectedFile(target.files);
  };

  const handleUpload = () => {
    console.log('photo: ', selectedFile());
  };

  return (
    <>
      <div>Photos</div>
      <div>
        <input type="file" accept="image/*" multiple name="photoUpload" onChange={photoSelectHandler} />
      </div>
      <div>
        <button onClick={handleUpload}>Upload Photo</button>
      </div>
    </>
  );
};
