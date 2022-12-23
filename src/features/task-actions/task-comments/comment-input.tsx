import { createSignal } from 'solid-js';
import { createServerAction$ } from 'solid-start/server';

import { TextField } from 'components/lib/text-field';
import { createComment } from 'db/comment/comment';
import { useToastRequest } from 'hooks/use-toast-request';

import type { createCommentProps, CommentWithUser } from 'db/comment/comment';
import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const CommentInput: Component<props> = (props) => {
  const [addCommentState, addComment] = createServerAction$(async (params: createCommentProps) => {
    await createComment(params);
  });
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | Record<string, unknown>>({});

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const lastComment = () => props.comments[props.comments.length - 1]?.id;

    useToastRequest(addCommentState);

    if (e.key === 'Enter') {
      addComment({
        message: target.value,
        taskId: props.task.id,
        userId: props.task.userId as string,
        ...(lastComment() && { parentId: lastComment() }),
      });

      inputRef().value = '';
    }
  };

  return <TextField inputRef={(el) => setInputRef(el)} onKeyDown={handleKeyDown} placeholder="Enter a comment..." />;
};
