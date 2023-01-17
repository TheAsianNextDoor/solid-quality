import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

import { EventNameFactory, pusherClient } from '~/utils/pusher';
import { trpcClient } from '~/utils/trpc';

import type { Component } from 'solid-js';
import type { TaskWithLinks } from '~/server/db/types/task-types';

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

  const userIdQuery = trpcClient.session.userId.useQuery();

  createEffect(() => {
    pusherClient.bind('typing-users', EventNameFactory.typingUsers(props.task.id), (data: TypingUsers[]) => {
      const userNames = Object.values(data).map(({ userName, userId }) => ({ userName, userId }));
      setTypingUsers(userNames);
    });
  });

  return <div>{createTypingUserMessage(typingUsers, userIdQuery.data)}</div>;
};
