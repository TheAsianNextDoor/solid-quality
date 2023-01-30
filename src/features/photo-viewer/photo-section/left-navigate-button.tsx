import NavigateBeforeRounded from '@suid/icons-material/NavigateBeforeRounded';
import { Show } from 'solid-js';

import type { Component } from 'solid-js';

interface props {
  handleClick: () => void;
  shouldShow: boolean;
}

export const LeftNavigateButton: Component<props> = (props) => {
  return (
    <Show when={props.shouldShow}>
      <div
        class="top-1/2 left-0 ml-14 absolute cursor-pointer"
        style={{
          width: '70px',
          background: 'rgba(0, 0, 0, 0.20)',
          'border-radius': '50%',
        }}
        onClick={props.handleClick}
      >
        <NavigateBeforeRounded class="text-neutral-300" style={{ 'font-size': '70px' }} />
      </div>
    </Show>
  );
};
