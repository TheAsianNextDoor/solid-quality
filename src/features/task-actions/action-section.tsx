import { useSearchParams } from 'solid-start';

import { Tabs } from '~/components/tabs';

import { CommentsPanel } from './task-comments/comments-panel';
import { PhotosPanel } from './task-photos/photos-panel';

import type { Component } from 'solid-js';
import type { CommentWithUser } from '~/server/db/types/comment-types';
import type { TaskWithLinks } from '~/server/db/types/task-types';

enum ActionTypes {
  observations = 'observations',
  comments = 'comments',
  attachments = 'attachments',
  photos = 'photos',
}

interface props {
  task: TaskWithLinks;
  comments: CommentWithUser[];
}

const TabIndexMap = {
  observations: 0,
  attachments: 1,
  comments: 2,
  photos: 3,
} as const;

export const ActionSection: Component<props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getTabIndex = () => {
    return TabIndexMap[(searchParams.tab as keyof typeof TabIndexMap) || 'observations'];
  };

  return (
    <div class="flex flex-col p-8 bg-orange-300 w-full h-full">
      <div class="text-2xl pb-4">Actions</div>
      <div class="h-full w-full">
        <Tabs.Provider index={getTabIndex()}>
          <Tabs.TabsList class="pb-4">
            <Tabs.Tab>{ActionTypes.observations}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.attachments}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.comments}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.photos}</Tabs.Tab>
          </Tabs.TabsList>
          <Tabs.Panel> Panel observations</Tabs.Panel>
          <Tabs.Panel> Panel attachments</Tabs.Panel>
          <Tabs.Panel>
            <CommentsPanel task={props.task} comments={props.comments} />
          </Tabs.Panel>
          <Tabs.Panel>
            <PhotosPanel task={props.task} />
          </Tabs.Panel>
        </Tabs.Provider>
      </div>
    </div>
  );
};
