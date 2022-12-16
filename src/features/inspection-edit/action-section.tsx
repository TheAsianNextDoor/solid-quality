import { Tabs } from 'components/tabs';
import { CommentList } from 'features/inspection-actions';

enum ActionTypes {
  observations = 'observations',
  comments = 'comments',
  attachments = 'attachments',
  photos = 'photos',
}

export const ActionSection = () => {
  return (
    <div class="flex flex-col gap-3 p-8">
      <div class="text-2xl">Actions</div>
      <div class="h-full w-full">
        <Tabs.Provider>
          <Tabs.TabsList>
            <Tabs.Tab>{ActionTypes.observations}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.attachments}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.comments}</Tabs.Tab>
            <Tabs.Tab>{ActionTypes.photos}</Tabs.Tab>
          </Tabs.TabsList>
          <Tabs.Panel> Panel observations</Tabs.Panel>
          <Tabs.Panel> Panel attachments</Tabs.Panel>
          <Tabs.Panel>
            <div>
              <CommentList />
            </div>
          </Tabs.Panel>
          <Tabs.Panel> Panel photos</Tabs.Panel>
        </Tabs.Provider>
      </div>
    </div>
  );
};
