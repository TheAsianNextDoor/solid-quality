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
        Tabs
        {/* <Tabs class="h-full" radius="md" defaultValue="attachments">
          <Tabs.List>
            <Tabs.Tab value={ActionTypes.observations}>{ActionTypes.observations}</Tabs.Tab>
            <Tabs.Tab value={ActionTypes.comments}>{ActionTypes.comments}</Tabs.Tab>
            <Tabs.Tab value={ActionTypes.attachments}>{ActionTypes.attachments}</Tabs.Tab>
            <Tabs.Tab value={ActionTypes.photos}>{ActionTypes.photos}</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={ActionTypes.observations} pt="xs">
            Observations tab content
          </Tabs.Panel>

          <Tabs.Panel value={ActionTypes.comments} pt="xs">
            Comments tab content
          </Tabs.Panel>

          <Tabs.Panel class="w-full h-full" value={ActionTypes.attachments} pt="xs">
            <div class="h-full w-full flex justify-center items-center">
              <FileInput />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value={ActionTypes.photos} pt="xs">
            Photos tab content
          </Tabs.Panel>
        </Tabs> */}
      </div>
    </div>
  );
};
