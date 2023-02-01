import Close from '@suid/icons-material/Close';
import ExpandLess from '@suid/icons-material/ExpandLess';
import ExpandMore from '@suid/icons-material/ExpandMore';
import Search from '@suid/icons-material/Search';
import { createSignal, Show, For, createEffect } from 'solid-js';

import type { Component } from 'solid-js';

interface SelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange?: (event: MouseEvent | KeyboardEvent, value: string) => void;
  loadOptions?: () => Promise<void>;
  value?: string;
  class?: string;
}

export const Select: Component<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [searchValue, setSearchValue] = createSignal('');
  const [selected, setSelected] = createSignal('');
  const [isHoveringMain, setIsHoveringMain] = createSignal(false);

  // const [data] = createResource(props.loadOptions);

  createEffect(() => {
    if (props.value) {
      setSelected(props.value);
    }
  });

  const isSelected = (option: string) => {
    return option.toLowerCase() === searchValue().toLowerCase();
  };

  const filteredOptions = () => {
    if (!searchValue()) {
      return props.options;
    }

    return props.options.filter((opt) => opt.value.toLowerCase().includes(searchValue().toLowerCase()));
  };

  const handleChange = (evt: MouseEvent, value: string) => {
    setSelected(value);

    props?.onChange?.(evt, value);
  };

  // eslint-disable-next-line solid/reactivity
  const placeholder = props.placeholder || 'Select an option...';

  return (
    <div class={`h-19 w-60 justify-between font-medium ${props.class}`}>
      <div
        class={`flex w-full items-center justify-between rounded bg-white p-2  ${!selected() && 'text-gray-700'}`}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        onMouseEnter={() => setIsHoveringMain(true)}
        onMouseLeave={() => setIsHoveringMain(false)}
      >
        <span class="text-black">
          <Show when={!!selected() && isHoveringMain()} fallback={<span class="pr-5" />}>
            <Close class="cursor-pointer" fontSize="small" onClick={(evt) => handleChange(evt, '')} />
          </Show>
          {selected() || placeholder}
        </span>
        <span class="flex items-center text-black">
          {/* <Suspense fallback={<CircularProgress class="mr-1" color="success" size={20} />} /> */}
          <Show when={isOpen()} fallback={<ExpandMore />}>
            <ExpandLess />
          </Show>
        </span>
      </div>
      <Show when={isOpen()}>
        <ul class="mt-2 max-h-60 overflow-y-auto bg-white ">
          <div class="sticky top-0 flex items-center bg-white px-2">
            <Search class="text-gray-700" />
            <input
              class="p-2 outline-none placeholder:text-gray-700"
              type="text"
              placeholder="Search options..."
              onInput={(evt) => setSearchValue(evt.currentTarget.value)}
            />
          </div>
          <For each={filteredOptions()}>
            {(option) => (
              <li
                class={`p-2 text-sm text-black hover:bg-sky-600 hover:text-white ${
                  isSelected(option.value) && 'bg-sky-600 text-white'
                }`}
                onClick={(evt) => handleChange(evt, option.value)}
              >
                {option.label}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};
