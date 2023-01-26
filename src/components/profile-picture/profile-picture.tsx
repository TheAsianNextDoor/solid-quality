import type { Component } from 'solid-js';

interface props {
  src: string;
}

export const ProfilePicture: Component<props> = (props) => {
  return <img class="w-16 h-16 rounded-full" src={props.src} />;
};
