import { Show } from 'solid-js';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { prismaInstance } from 'db';

export function routeData() {
  const tasks = createServerData$(async () =>
    prismaInstance.task.findMany({
      include: { Links: true },
    }),
  );

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
