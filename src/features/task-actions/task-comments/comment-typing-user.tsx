import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

import { sessionResource } from '~/requests/session-resource';
import { EventNameFactory, pusherClient } from '~/utils/pusher';

import type { Component } from 'solid-js';
import type { TaskWithLinks } from '~/server/prisma/types/task-types';

interface props {
  task: TaskWithLinks;
}

const createTypingUserMessage = (typingUsers: TypingUsers[], myUserId: string | undefined) => {
  const notMeTypingUsers = typingUsers.filter((typingUser) => typingUser.userId !== myUserId);
  if (!notMeTypingUsers.length) return '';

  const notMeUserNames = notMeTypingUsers.map(({ userName }) => userName);

  const joinedString = notMeUserNames.join(', ');

  return `${joinedString} ${notMeUserNames.length === 1 ? 'is' : 'are'} typing`;
};

interface TypingUsers {
  userName: string;
  userId: string;
}

export const CommentTypingUser: Component<props> = (props) => {
  const [typingUsers, setTypingUsers] = createStore<TypingUsers[]>([]);

  const userIdQuery = sessionResource.queries.useUserId();

  createEffect(() => {
    pusherClient.bind('typing-users', EventNameFactory.typingUsers(props.task.id), (data: TypingUsers[]) => {
      const userNames = Object.values(data).map(({ userName, userId }) => ({ userName, userId }));
      setTypingUsers(userNames);
    });
  });

  return <div>{createTypingUserMessage(typingUsers, userIdQuery.data)}</div>;
};
