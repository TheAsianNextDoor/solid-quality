import { For, createResource } from 'solid-js';
import { createServerAction$, createServerData$ } from 'solid-start/server';

import { TextField } from 'components/lib/text-field';
import { createComment, getCommentsByTaskId } from 'db/comment';

import type { createCommentProps } from 'db/comment';
import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

interface props {
  task?: TaskWithLinks;
}

export const CommentList: Component<props> = (props) => {
  const comments = createServerData$((taskId) => getCommentsByTaskId(taskId), {
    key: () => props.task?.id,
  });

  const orderedComments = () =>
    comments()
      ?.slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const [_, createCom] = createServerAction$(async (params: createCommentProps) => {
    await createComment(params);
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      createCom({
        inspectionId: props.task?.inspectionId,
        message: e?.target?.value,
        parentId: orderedComments()[orderedComments()?.length - 1].id,
        taskId: props.task?.id,
        userId: props.task?.userId,
      });
      console.log('hi');
    }
  };

  return (
    <>
      <For each={orderedComments()}>
        {(comment) => (
          <div class="bg-red-300 m-5">
            <div>{comment.message}</div>
            <div>{comment.userId}</div>
          </div>
        )}
      </For>
      <TextField class="w-full" onKeyDown={handleKeyDown} placeholder="Enter a comment..." />
    </>
  );
};
