import { For, mapArray, createEffect, on, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Avatar } from '~/components/lib/avatar';
import { computeFullName } from '~/server/user/user-utils';
import { pusherClient } from '~/utils/pusher';

import type { Component } from 'solid-js';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

import { formatCommentTimeStamp } from '../../../utils/time-utils';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentList: Component<props> = (props) => {
  const [timeStamps, setTimeStamps] = createStore<string[]>([]);
  const [pusherComments, setPusherComments] = createStore<CommentWithUser[]>([]);

  const comments = () => {
    return [...props.comments, ...pusherComments];
  };

  let divRef: HTMLInputElement | undefined;

  const channel = pusherClient.subscribe('create-task-comment');

  channel.bind(`create-task-comment-${props.task.id}`, (data: CommentWithUser) => {
    setPusherComments([...pusherComments, data]);
  });

  createEffect(
    on(
      () => comments().length,
      () => {
        // @ts-ignore refs don't play well with TS
        divRef.scrollTop = divRef?.scrollHeight || 0;
      },
    ),
  );

  createEffect(() => {
    const formattedTimestamps = mapArray(
      comments,
      (comment) => formatCommentTimeStamp(comment.createdAt, new Date()) || '1s',
    );
    setTimeStamps(formattedTimestamps());
  });

  const timestampInterval = setInterval(() => {
    const formattedTimestamps = mapArray(comments, (comment) => formatCommentTimeStamp(comment.createdAt, new Date()));
    setTimeStamps(formattedTimestamps());
  }, 1000 * 10);

  onCleanup(() => {
    clearInterval(timestampInterval);
    pusherClient.unbind(`create-comment-${props.task.id}`);
  });

  return (
    <div ref={divRef} class="overflow-y-auto" style={{ height: '700px' }}>
      <For each={comments()}>
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
    </div>
  );
};
