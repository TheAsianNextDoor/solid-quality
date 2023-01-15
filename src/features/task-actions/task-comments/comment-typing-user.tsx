import { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { TaskWithLinks } from '~/server/db/types/task-types';
import { pusherClient } from '~/utils/pusher';

interface props {
  task: TaskWithLinks;
}

const createTypingUserMessage = (typingUsers: string[]) => {
  if (!typingUsers.length) return '';

  const joinedString = typingUsers.join(', ');

  return `${joinedString} ${typingUsers.length === 1 ? 'is' : 'are'} typing`;
};

export const CommentTypingUser: Component<props> = (props) => {
  const [typingUsers, setTypingUsers] = createStore<string[]>([]);
  const channel = pusherClient.subscribe('typing-users');

  channel.bind(`typing-users-task-${props.task.id}`, (data) => {
    const userNames = Object.values(data).map((item) => item.userName);
    setTypingUsers(userNames);
  });

  return <div>{createTypingUserMessage(typingUsers)}</div>;
};
