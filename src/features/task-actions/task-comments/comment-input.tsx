import { createSignal } from 'solid-js';

import { TextField } from '~/components/lib/text-field';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentInput: Component<props> = (props) => {
  const createCommentMutation = trpcClient.comment.create.useMutation();
  const typingUserMutation = trpcClient.comment.userTyping.useMutation();

  const [inputRef, setInputRef] = createSignal<HTMLInputElement | Record<string, unknown>>({});

  const handleKeyDown = async (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const lastComment = () => props.comments[props.comments.length - 1]?.id;

    if (e.key !== 'Enter') {
      typingUserMutation.mutate({
        taskId: props.task.id,
      });
    }
    if (e.key === 'Enter') {
      createCommentMutation.mutate({
        message: target.value,
        taskId: props.task.id,
        ...(lastComment() && { parentId: lastComment() }),
      });

      if (!createCommentMutation.error) {
        inputRef().value = '';
      }
    }
  };

  return <TextField inputRef={(el) => setInputRef(el)} onKeyDown={handleKeyDown} placeholder="Enter a comment..." />;
};
