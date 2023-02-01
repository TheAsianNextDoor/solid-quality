import type { Component } from 'solid-js';

interface props {
  src: string;
}

export const ProfilePicture: Component<props> = (props) => {
  return <img class="h-16 w-16 rounded-full" src={props.src} />;
};
