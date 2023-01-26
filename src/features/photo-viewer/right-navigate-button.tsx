import NavigateNextRounded from '@suid/icons-material/NavigateNextRounded';
import { Show } from 'solid-js';

import type { Component } from 'solid-js';

interface props {
  handleClick: () => void;
  shouldShow: boolean;
}

export const RightNavigateButton: Component<props> = (props) => {
  return (
    <Show when={props.shouldShow}>
      <div
        class="top-1/2 right-0 mr-14 absolute cursor-pointer"
        style={{
          width: '70px',
          background: 'rgba(0, 0, 0, 0.20)',
          'border-radius': '50%',
        }}
        onClick={props.handleClick}
      >
        <NavigateNextRounded class="text-neutral-300" style={{ 'font-size': '70px' }} />
      </div>
    </Show>
  );
};
