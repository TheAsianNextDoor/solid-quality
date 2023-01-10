import { EventEmitter } from 'events';

import { observable } from '@trpc/server/observable';
import { z } from 'zod';

import { CommentModel } from '~/server/db/models/comment-model';
import { protectedProcedure, router, t } from '~/server/trpc/utils';

import type { CommentCreateData } from '~/server/db/types/comment-types';

interface MyEvents {
  createComment: (data: CommentCreateData) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(event: TEv, ...args: Parameters<MyEvents[TEv]>): boolean;
}

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

// attempt at copying the hello-world example

export const addRouter = t.router({
  onAdd: t.procedure.subscription(() => {
    // `resolve()` is triggered for each client when they start subscribing `onAdd`
    // return an `observable` with a callback which is triggered immediately
    return observable<any>((emit) => {
      const onAdd = (data) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on('add', onAdd);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
  add: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const post = { ...input }; /* [..] add to db */
      console.log('added');

      ee.emit('add', post);
      return post;
    }),
});

export const commentRouter = router({
  getCommentsByTask: protectedProcedure.input(z.object({ taskId: z.string() })).query(({ input }) => {
    const { taskId } = input;

    if (!taskId) {
      return [];
    }

    return CommentModel.findMany({
      where: { taskId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }),
  createComment: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.string(),
        parentId: z.string().optional(),
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const comment = await CommentModel.create({ data: input });

      ee.emit('createComment', input);

      console.log('emit create');

      return comment;
    }),
  observedComments: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      const onComment = (data) => {
        console.log('In observed: ', data);
        emit.next(data);
      };

      ee.on('createComment', onComment);

      return () => {
        ee.off('createComment', onComment);
      };
    });
  }),
});
