import { TaskStatus } from '@prisma/client';
import { For } from 'solid-js';
import { createRouteData, useRouteData, useNavigate } from 'solid-start';

import { Chip } from '~/components/lib/chip';
import { Typography } from '~/components/lib/typography';
import { Protected } from '~/components/protected';

import type { Task } from '@prisma/client';
import type { RouteDataArgs } from 'solid-start';

import { trpcClient } from '../../utils/trpc';

export function routeData({ params }: RouteDataArgs) {
  const inspections = createRouteData(() => {
    return trpcClient.inspection.getBySiteId.useQuery(() => ({ siteId: params.siteId }));
  });

  return { inspections };
}

const { Page } = Protected(() => {
  const { inspections } = useRouteData<typeof routeData>();
  const nav = useNavigate();

  const taskStatusCount = (tasks: Task[], status: string) => {
    return tasks.reduce((acc, task) => {
      if (task.status === status) {
        const temp = acc + 1;

        return temp;
      }

      return acc;
    }, 0);
  };

  return (
    <>
      {
        <For each={inspections()?.data}>
          {(inspection) => (
            <div class="m-7 flex h-40 items-center justify-between bg-slate-400 p-7 text-white">
              <div class="flex flex-col justify-center">
                <div>
                  <Typography
                    class="cursor-pointer hover:underline"
                    variant="h4"
                    onClick={() => nav(`/inspection/${inspection.id}`)}
                  >
                    {inspection.title}
                  </Typography>
                  <div class="flex gap-4">
                    <Chip color="success" label={`passed ${taskStatusCount(inspection.Task, TaskStatus.PASSED)}`} />
                    <Chip color="error" label={`failed ${taskStatusCount(inspection.Task, TaskStatus.FAILED)}`} />
                    <Chip color="secondary" label={`skipped ${taskStatusCount(inspection.Task, TaskStatus.SKIPPED)}`} />
                  </div>
                </div>
                <div>
                  <Typography variant="h6">{inspection.description}</Typography>
                </div>
              </div>
            </div>
          )}
        </For>
      }
    </>
  );
});

export default Page;
