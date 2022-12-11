import { For, createEffect } from 'solid-js';
import { useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';

import { prisma } from 'db';
import { InfoSection, ActionSection } from 'features/inspection-edit';

import styles from './inspection.module.css';

export function routeData() {
  const tasks = createServerData$(async () =>
    prisma.task.findMany({
      include: { Links: true },
    }),
  );

  return { tasks };
}

export default function InspectionEdit() {
  const { tasks } = useRouteData<typeof routeData>();

  return (
    <>
      Edit Page
      <For each={tasks()}>
        {(task) => (
          <div class="my-5 bg-gray-100">
            <div class={styles.grid}>
              <InfoSection task={task} />
              <ActionSection />
            </div>
          </div>
        )}
      </For>
    </>
  );
}
