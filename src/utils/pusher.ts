import PusherJs from 'pusher-js';
import { onCleanup } from 'solid-js';

import { clientEnv } from '~/env/client';

import type { Channel } from 'pusher-js';

const pusher = new PusherJs(clientEnv.NEXT_PUBLIC_PUSHER_APP_KEY, { cluster: clientEnv.NEXT_PUBLIC_PUSHER_CLUSTER });

type ChannelNames = 'typing-users' | 'create-comment-task';

const CHANNEL_ENUM: Partial<Record<ChannelNames, Channel>> = {};

const subscribe = (channelName: ChannelNames) => {
  if (!(channelName in CHANNEL_ENUM)) {
    const sub = pusher.subscribe(channelName);
    CHANNEL_ENUM[channelName] = sub;

    return sub;
  }

  return CHANNEL_ENUM[channelName] as Channel;
};

const bind = (channelName: ChannelNames, eventName: string, callback: (data: any) => void) => {
  const channel = subscribe(channelName);
  channel.bind(eventName, callback);

  onCleanup(() => {
    channel.unbind();
  });
};

export const EventNameFactory = {
  typingUsers: (taskId: string) => `typing-users-task-${taskId}`,
  createComment: (taskId: string) => `create-comment-task-${taskId}`,
};

export const pusherClient = {
  subscribe,
  bind,
};
