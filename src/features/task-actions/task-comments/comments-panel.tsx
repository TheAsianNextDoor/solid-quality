import { CommentInput } from './comment-input';
import { CommentList } from './comment-list';

import type { CommentWithUser } from 'server/comment/comment-types';
import type { TaskWithLinks } from 'server/task/task-types';
import type { Component } from 'solid-js';

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
