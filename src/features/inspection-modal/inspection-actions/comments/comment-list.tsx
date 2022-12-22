import { For, mapArray, createEffect, on } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createServerAction$ } from 'solid-start/server';

import { Avatar } from 'components/lib/avatar';
import { TextField } from 'components/lib/text-field';
import { createComment } from 'db/comment';
import { computeFullName } from 'db/user';
import { useToastRequest } from 'hooks/use-toast-request';

import { formatCommentTimeStamp } from '../../../../utils/timeUtils';

import type { createCommentProps, CommentWithUser } from 'db/comment';
import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentList: Component<props> = (props) => {
  const [timeStamps, setTimeStamps] = createStore<string[]>([]);

  const orderedComments = () =>
    props.comments.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  createEffect(
    on(orderedComments, () => {
      const formattedTimestamps = mapArray(orderedComments, (comment) =>
        formatCommentTimeStamp(comment.createdAt, new Date()),
      );
      setTimeStamps(formattedTimestamps());
    }),
  );

  createEffect(() => {
    setInterval(() => {
      const formattedTimestamps = mapArray(orderedComments, (comment) =>
        formatCommentTimeStamp(comment.createdAt, new Date()),
      );
      setTimeStamps(formattedTimestamps());
    }, 1000 * 60);
  });

  const [addCommentState, addComment] = createServerAction$(async (params: createCommentProps) => {
    await createComment(params);
  });

  useToastRequest(addCommentState);

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const lastComment = () => orderedComments()[orderedComments().length - 1]?.id;

    if (e.key === 'Enter') {
      addComment({
        message: target.value,
        taskId: props.task.id,
        userId: props.task.userId as string,
        ...(lastComment() && { parentId: lastComment() }),
      });
    }
  };

  return (
    <>
      <For each={orderedComments()}>
        {(comment, index) => (
          <div class="bg-red-300 p-2 m-5 flex items-center">
            <Avatar>h</Avatar>
            <div class="pl-3">
              <div class="flex items-center space-x-2 pb-3">
                <div>{computeFullName(comment.user)}</div>
                <div>•</div>
                <div>{timeStamps[index()]}</div>
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
