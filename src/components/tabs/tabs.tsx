import { children, createContext, createEffect, createSignal, onMount, Show, useContext } from 'solid-js';

import type { Component, JSX } from 'solid-js';

interface ContextValue {
  isSelected: (id: number) => boolean;
  setSelectedId: (id: number) => void;
  registerTab: (node: HTMLButtonElement) => number;
  registerPanel: (node: HTMLDivElement) => number;
}

const TabsContext = createContext<ContextValue>();
const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabsContext must be used within a `<Tabs />` component');
  }

  return context;
};

interface TabsProps {
  children: JSX.Element;
  index?: number;
}

const Provider: Component<TabsProps> = (props) => {
  const [selectedId, setSelectedId] = createSignal(props?.index || 0);

  const [tabs, setTabs] = createSignal<HTMLButtonElement[]>([]);
  const [panels, setPanels] = createSignal<HTMLElement[]>([]);

  createEffect(() => {
    setSelectedId(props?.index || 0);
  });

  const isSelected = (id: number) => {
    return id === selectedId();
  };

  const registerTab = (node: HTMLButtonElement) => {
    return setTabs((prev) => [...prev, node]).length - 1;
  };

  const registerPanel = (node: HTMLDivElement) => {
    return setPanels((prev) => [...prev, node]).length - 1;
  };

  const value: ContextValue = {
    setSelectedId,
    isSelected,
    registerTab,
    registerPanel,
  };

  return <TabsContext.Provider value={value}>{props.children}</TabsContext.Provider>;
};

interface TabsListProps {
  children: JSX.Element;
  class: string;
}

const TabsList: Component<TabsListProps> = (props) => {
  const child = children(() => props.children);
  return <div class={`flex flex-row ${props.class}`}>{child()}</div>;
};

interface TabProps {
  children: Element | string;
  handleClick?: () => void;
}

const Tab: Component<TabProps> = (props) => {
  const [id, setId] = createSignal(-1);
  const { registerTab, setSelectedId, isSelected } = useTabs();

  const refFunction = (node: HTMLButtonElement) => {
    const registeredId = registerTab(node);
    setId(registeredId);
  };

  const handleClick = () => {
    setSelectedId(id());
    props?.handleClick?.();
  };

  const child = children(() => props.children);

  return (
    <button
      class="px-4"
      style={{ color: isSelected(id()) ? 'blue' : '', 'text-decoration': isSelected(id()) ? 'underline' : '' }}
      ref={refFunction}
      onClick={handleClick}
    >
      {child}
    </button>
  );
};

interface PanelProps {
  children: JSX.Element;
}

const Panel: Component<PanelProps> = (props) => {
  const [id, setId] = createSignal(-1);
  const { registerPanel, isSelected } = useTabs();

  const refFunction = (node: HTMLDivElement) => {
    const registeredId = registerPanel(node);
    setId(registeredId);
  };

  const child = children(() => props.children);

  return (
    <div class={`${isSelected(id()) && 'w-full h-full'}`} ref={refFunction}>
      <Show when={isSelected(id())} fallback={<></>}>
        {child()}
      </Show>
    </div>
  );
};

export const Tabs = {
  Provider,
  Panel,
  Tab,
  TabsList,
};
