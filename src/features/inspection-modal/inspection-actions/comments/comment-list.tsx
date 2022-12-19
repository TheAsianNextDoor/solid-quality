import { For } from 'solid-js';
import { createServerAction$, createServerData$ } from 'solid-start/server';

import { Avatar } from 'components/lib/avatar';
import { TextField } from 'components/lib/text-field';
import { createComment, getCommentsByTaskId } from 'db/comment';
import { computeFullName } from 'db/user';

import { formatCommentTimeStamp } from '../../../../utils/timeUtils';

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
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const [_, addComment] = createServerAction$(async (params: createCommentProps) => {
    await createComment(params);
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addComment({
        inspectionId: props.task?.inspectionId,
        message: e?.target?.value,
        parentId: orderedComments()[orderedComments()?.length - 1]?.id,
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
          <div class="bg-red-300 p-2 m-5 flex items-center">
            <Avatar>h</Avatar>
            <div class="pl-3">
              <div class="flex items-center space-x-2 pb-3">
                <div>{computeFullName(comment.user)}</div>
                <div>{formatCommentTimeStamp(comment.createdAt)}</div>
              </div>
              <div>{comment.message}</div>
            </div>
          </div>
        )}
      </For>
      <TextField class="w-full" onKeyDown={handleKeyDown} placeholder="Enter a comment..." />
    </>
  );
};
