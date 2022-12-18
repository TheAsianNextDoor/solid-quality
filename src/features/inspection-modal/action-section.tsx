import { Tabs } from 'components/tabs';
import { CommentList } from 'features/inspection-modal/inspection-actions';

import type { TaskWithLinks } from 'db/task';
import type { Component } from 'solid-js';

enum ActionTypes {
  observations = 'observations',
  comments = 'comments',
  attachments = 'attachments',
  photos = 'photos',
}

interface props {
  task?: TaskWithLinks;
}

export const ActionSection: Component<props> = (props) => {
  return (
    <div class="flex flex-col p-8 bg-orange-300 w-full h-full">
      <div class="text-2xl pb-4">Actions</div>
      <div class="h-full w-full">
        <Tabs.Provider>
          <Tabs.TabsList class="pb-4">
            <Tabs.Tab>{ActionTypes.observations}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.attachments}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.comments}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.photos}</Tabs.Tab>
          </Tabs.TabsList>
          <Tabs.Panel> Panel observations</Tabs.Panel>
          <Tabs.Panel> Panel attachments</Tabs.Panel>
          <Tabs.Panel>
            <div>
              <CommentList task={props.task} />
            </div>
          </Tabs.Panel>
          <Tabs.Panel> Panel photos</Tabs.Panel>
        </Tabs.Provider>
      </div>
    </div>
  );
};
