import { Box } from '@suid/material';
import { Show } from 'solid-js';

import { ActionSection } from './action-section';
import { InfoSection } from './info-section';
import styles from './inspection-modal.module.css';

import type { CommentWithUser } from 'db/comment';
import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

export const TaskModal: Component<props> = (props) => {
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
        minWidth: 700,
        maxWidth: 1000,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: '24px',
      }}
    >
      <div class={`${styles.grid} w-full h-full`}>
        <Show when={props.task === undefined}>Cannot load task</Show>
        <InfoSection task={props.task as TaskWithLinks} />
        <ActionSection task={props.task} comments={props.comments} />
      </div>
    </Box>
  );
};
