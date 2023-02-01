import { CommentInput } from './comment-input';
import { CommentList } from './comment-list';
import { CommentTypingUser } from './comment-typing-user';

import type { Component } from 'solid-js';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentsPanel: Component<props> = (props) => {
  return (
    <>
      <div class="flex h-full flex-col content-between justify-between">
        <CommentList task={props.task} comments={props.comments} />
        <div>
          <CommentInput task={props.task} comments={props.comments} />
          <div class="pb-10">
            <CommentTypingUser task={props.task} />
          </div>
        </div>
      </div>
    </>
  );
};
