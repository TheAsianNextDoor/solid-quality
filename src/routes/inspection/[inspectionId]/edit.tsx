import { Show } from 'solid-js';
import { Outlet, createRouteData, useRouteData } from 'solid-start';

import { api } from '~/utils/trpc';

import type { RouteDataArgs } from 'solid-start';

export function routeData({ params }: RouteDataArgs) {
  const tasks = createRouteData(async () => {
    return api.task.getTasksByInspection.useQuery(() => ({ inspectionId: params.inspectionId }));
  });

  return { tasks };
}

export type routeDataType = typeof routeData;
export type routeDataReturn = ReturnType<routeDataType>;

export default function Inspection() {
  const { tasks } = useRouteData<routeDataType>();

  return (
    <Show when={!!tasks()?.data} fallback={<>Loading...</>}>
      <Outlet />
    </Show>
  );
}
