import { For, mapArray, createEffect, on } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Avatar } from 'components/lib/avatar';
import { computeFullName } from 'db/user';

import { formatCommentTimeStamp } from '../../../utils/timeUtils';

import type { CommentWithUser } from 'db/comment/comment';
import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentList: Component<props> = (props) => {
  const [timeStamps, setTimeStamps] = createStore<string[]>([]);

  createEffect(
    on(
      () => props.comments,
      () => {
        const formattedTimestamps = mapArray(
          () => props.comments,
          (comment) => formatCommentTimeStamp(comment.createdAt, new Date()),
        );
        setTimeStamps(formattedTimestamps());
      },
    ),
  );

  createEffect(() => {
    setInterval(() => {
      const formattedTimestamps = mapArray(
        () => props.comments,
        (comment) => formatCommentTimeStamp(comment.createdAt, new Date()),
      );
      setTimeStamps(formattedTimestamps());
    }, 1000 * 60);
  });

  return (
    <div class="overflow-y-auto">
      <For each={props.comments}>
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
