import { createSignal } from 'solid-js';

import { TextField } from '~/components/lib/text-field';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';
import { pusherClient } from '~/utils/pusher';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentInput: Component<props> = (props) => {
  const { mutate: addComment, error: addCommentError } = trpcClient.comment.create.useMutation();
  const { mutate: typingUser } = trpcClient.comment.userTyping.useMutation();
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | Record<string, unknown>>({});

  const channel = pusherClient.subscribe('typing-users');

  const handleKeyDown = async (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const lastComment = () => props.comments[props.comments.length - 1]?.id;

    if (e.key !== 'Enter') {
      typingUser({
        userId: props.task.userId as string,
        taskId: props.task.id,
        userName: 'aaron',
      });
    }
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
