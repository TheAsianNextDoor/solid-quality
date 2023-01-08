import { CommentInput } from './comment-input';
import { CommentList } from './comment-list';

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
      <div class="flex justify-between content-between flex-col h-full">
        <CommentList task={props.task} comments={props.comments} />
        <div class="mb-10">
          <CommentInput task={props.task} comments={props.comments} />
        </div>
      </div>
    </>
  );
};
