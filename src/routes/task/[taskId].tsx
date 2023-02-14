import { Match, Switch } from 'solid-js';
import { createRouteData, useRouteData } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { Protected } from '~/components/protected';
import { ActionSection } from '~/features/task-actions';
import { InfoSection } from '~/features/task-info';
import { attachmentResource } from '~/requests/attachment-resource';
import { commentResource } from '~/requests/comment-resource';
import { photoResource } from '~/requests/photo-resource';
import { taskResource } from '~/requests/task-resource';

import styles from './styles.module.css';

import type { RouteDataArgs } from 'solid-start';
import type { AttachmentWithUrl } from '~/server/prisma/types/attachment-types';
import type { CommentWithUser } from '~/server/prisma/types/comment-types';
import type { PhotoWithUrl } from '~/server/prisma/types/photo-types';
import type { TaskWithLinks } from '~/server/prisma/types/task-types';

export function routeData({ params }: RouteDataArgs) {
  const task = createRouteData(
    async () => {
      return taskResource.queries.useGetById(() => ({ taskId: params.taskId }));
    },
    { key: () => ['task', params.taskId] },
  );

  const attachments = createRouteData(async () => {
    return attachmentResource.queries.useGetSignedGetUrlsByTask(() => ({
      taskId: params?.taskId,
    }));
  });

  const comments = createRouteData(
    () => {
      return commentResource.queries.useGetByTaskId(() => ({ taskId: params.taskId }));
    },
    {
      key: () => ['comment', params.taskId],
    },
  );

  const photos = createRouteData(async () => {
    return photoResource.queries.useGetSignedGetUrlsByTask(() => ({ taskId: params.taskId }));
  });

  return {
    task,
    attachments,
    comments,
    photos,
  };
}

const { Page } = Protected(() => {
  const { task, attachments, comments, photos } = useRouteData<typeof routeData>();

  return (
    <>
      <Switch fallback={<Spinner />}>
        <Match when={comments()?.isError || task()?.isError}>
          <>Data Loading Error</>
        </Match>
        <Match when={comments()?.isSuccess && task()?.isSuccess}>
          <div class={`${styles.grid} min-h-screen w-full`}>
            <InfoSection task={task()?.data as TaskWithLinks} />
            <ActionSection
              task={task()?.data as TaskWithLinks}
              attachments={attachments()?.data as AttachmentWithUrl[]}
              comments={comments()?.data as CommentWithUser[]}
              photos={photos()?.data as PhotoWithUrl[]}
            />
          </div>
        </Match>
      </Switch>
    </>
  );
});

export default Page;
