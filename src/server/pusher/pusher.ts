import Pusher from 'pusher';
import { serverEnv } from '~/env/server';

import type { TriggerParams } from 'pusher';

const pusher = new Pusher({
  appId: serverEnv.PUSHER_APP_ID,
  key: serverEnv.PUSHER_KEY,
  secret: serverEnv.PUSHER_SECRET,
  cluster: serverEnv.PUSHER_CLUSTER,
});

type Channel = string | string[];
type Event = string;
type Data = any;

const trigger = (channel: Channel, event: Event, data: Data, params?: TriggerParams) => {
  return pusher.trigger(channel, event, data, params);
};

export const pusherClient = {
  trigger,
};
