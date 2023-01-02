import { Show } from 'solid-js';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { getTaskByInspectionId } from 'server/task/task-service';

import type { RouteDataArgs } from 'solid-start';

export function routeData({ params }: RouteDataArgs) {
  const tasks = createServerData$(async ({ inspectionId }) => getTaskByInspectionId(inspectionId), {
    key: () => ({
      inspectionId: params.inspectionId,
    }),
  });

  return { tasks };
}

export type routeDataType = typeof routeData;
export type routeDataReturn = ReturnType<routeDataType>;

export default function Inspection() {
  const { tasks } = useRouteData<routeDataType>();

  return (
    <Show when={!!tasks} fallback={<>Loading...</>}>
      <Outlet />
    </Show>
  );
}
