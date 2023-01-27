import { Show } from 'solid-js';
import { Outlet, createRouteData, useRouteData } from 'solid-start';

import { Protected } from '~/components/protected';
import { trpcClient } from '~/utils/trpc';

import type { RouteDataArgs } from 'solid-start';

export function routeData({ params }: RouteDataArgs) {
  const tasks = createRouteData(
    async () => {
      return trpcClient.task.getTasksByInspection.useQuery(() => ({ inspectionId: params.inspectionId }));
    },
    { key: () => ['inspection', params.inspectionId] },
  );

  return { tasks };
}

export type routeDataType = typeof routeData;
export type routeDataReturn = ReturnType<routeDataType>;

const { Page } = Protected(() => {
  const { tasks } = useRouteData<routeDataType>();

  return (
    <Show when={!!tasks()?.data} fallback={<>Loading...</>}>
      <Outlet />
    </Show>
  );
});

export default Page;
