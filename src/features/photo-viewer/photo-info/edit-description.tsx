import { createSignal, Show } from 'solid-js';
import { useSearchParams } from 'solid-start';

import { Button } from '~/components/lib/button';
import { TextField } from '~/components/lib/text-field';
import { queryClient, trpcClient } from '~/utils/trpc';

import type { Photo, User } from '@prisma/client';
import type { Component } from 'solid-js';

interface props {
  selectedPhoto: Photo & { url: string; user: User };
}

export const EditDescription: Component<props> = (props) => {
  const [showEdit, setShowEdit] = createSignal(false);
  const [description, setDescription] = createSignal(props.selectedPhoto.description || '');
  const [searchParams] = useSearchParams();

  const updateDescriptionMutation = trpcClient.photo.updateDescription.useMutation();

  const handleSave = async () => {
    await updateDescriptionMutation.mutateAsync({ description: description(), photoId: props.selectedPhoto.id });
    // @ts-ignore
    await queryClient.invalidateQueries({
      queryKey: () => ['photo.signedGetUrlsByTask', { taskId: searchParams.taskId }],
    });
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
