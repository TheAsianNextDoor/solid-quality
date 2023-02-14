import { createSignal, Show } from 'solid-js';

import { Button } from '~/components/lib/button';
import { TextField } from '~/components/lib/text-field';
import { photoResource } from '~/requests/photo-resource';

import type { Photo, User } from '@prisma/client';
import type { Component } from 'solid-js';

interface props {
  selectedPhoto: Photo & { url: string; user: User };
}

export const EditDescription: Component<props> = (props) => {
  const [showEdit, setShowEdit] = createSignal(false);
  // eslint-disable-next-line solid/reactivity
  const [description, setDescription] = createSignal(props.selectedPhoto.description || '');

  const updateDescription = photoResource.mutations.useUpdateDescription();

  const handleSave = async () => {
    updateDescription.mutate({ description: description(), photoId: props.selectedPhoto.id });
    setShowEdit(false);
  };

  return (
    <div class="mt-4">
      <Show when={!showEdit()}>
        <div>{props.selectedPhoto.description}</div>
        <div class="pt-2">
          <Button type="button" class="w-10" onClick={() => setShowEdit(true)}>
            Edit
          </Button>
        </div>
      </Show>
      <Show when={showEdit()}>
        <TextField multiline rows={4} value={description()} onChange={(e) => setDescription(e.currentTarget.value)} />
        <Button type="submit" onClick={handleSave}>
          Done Editing
        </Button>
        <Button type="reset" onClick={() => setShowEdit(false)}>
          Cancel
        </Button>
      </Show>
    </div>
  );
};
