import { Box } from '@suid/material';
import { Show } from 'solid-js';

import { ActionSection } from './action-section';
import { InfoSection } from './info-section';
import styles from './inspection-modal.module.css';

import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

interface props {
  tasks: TaskWithLinks[] | undefined;
  selectedTaskIndex: number;
}

export const InspectionModal: Component<props> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        margin: 'auto',
        minHeight: 500,
        maxHeight: 600,
        minWidth: 800,
        maxWidth: 1000,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: '24px',
      }}
    >
      <div class={`${styles.grid} w-full h-full`}>
        <Show when={props.tasks?.[props.selectedTaskIndex] === undefined}>Cannot load task</Show>
        <InfoSection task={props.tasks?.[props.selectedTaskIndex] as TaskWithLinks} />
        <ActionSection />
      </div>
    </Box>
  );
};
