import CloseIcon from '@suid/icons-material/Close';

import type { Component } from 'solid-js';

interface props {
  handleClick: () => void;
}

export const CloseButton: Component<props> = (props) => {
  return (
    <CloseIcon class="text-neutral-300 cursor-pointer" onClick={props.handleClick} style={{ 'font-size': '40px' }} />
  );
};
