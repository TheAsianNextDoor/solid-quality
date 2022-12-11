import { Tabs } from 'components/tabs';

export default function Test() {
  return (
    <>
      Test
      <div>
        <Tabs.Provider>
          <Tabs.TabsList>
            <Tabs.Tab>Tab 1</Tabs.Tab>
            <Tabs.Tab>Tab 2</Tabs.Tab>
            <Tabs.Tab>Tab 3</Tabs.Tab>
          </Tabs.TabsList>
          <Tabs.Panel> Panel 1</Tabs.Panel>
          <Tabs.Panel> Panel 2</Tabs.Panel>
          <Tabs.Panel> Panel 3</Tabs.Panel>
        </Tabs.Provider>
      </div>
    </>
  );
}
