import { createSignal } from 'solid-js';

import { TextField } from '~/components/lib/text-field';
import { trpc } from '~/utils/trpc';

import type { Component } from 'solid-js';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentInput: Component<props> = (props) => {
  const { mutate: addComment, error: addCommentError } = trpc.createComment.useMutation();
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | Record<string, unknown>>({});

  const handleKeyDown = async (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const lastComment = () => props.comments[props.comments.length - 1]?.id;

    if (e.key === 'Enter') {
      addComment({
        message: target.value,
        taskId: props.task.id,
        userId: props.task.userId as string,
        ...(lastComment() && { parentId: lastComment() }),
      });

      if (!addCommentError) {
        inputRef().value = '';
      }
    }
  };

  return <TextField inputRef={(el) => setInputRef(el)} onKeyDown={handleKeyDown} placeholder="Enter a comment..." />;
};
