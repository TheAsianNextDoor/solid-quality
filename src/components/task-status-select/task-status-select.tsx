import { For } from 'solid-js';

import { taskResource } from '~/requests/task-resource';

import { Select, SelectItem } from '../lib/select';

import type { SelectChangeEvent } from '@suid/material/Select';
import type { Component } from 'solid-js';

const taskStatus = {
  PASSED: 'PASSED',
  ACCEPTABLE: 'ACCEPTABLE',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED',
} as const;

interface props {
  taskStatus: string | null;
  taskId: string;
}

export const TaskStatusSelect: Component<props> = (props) => {
  const updateTaskStatusMutation = taskResource.mutations.useUpdateTaskStatus();

  const handleChange = (evt: SelectChangeEvent<any>) => {
    const status = evt.target.value as keyof typeof taskStatus;
    updateTaskStatusMutation.mutate({ taskId: props.taskId, status });
  };

  return (
    <div style={{ 'min-width': '10rem' }}>
      <Select label="Status" value={props.taskStatus} onChange={handleChange}>
        <For each={Object.values(taskStatus)}>
          {(status) => {
            return <SelectItem value={status}>{status}</SelectItem>;
          }}
        </For>
      </Select>
    </div>
  );
};
