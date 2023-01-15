import { Title } from 'solid-start';

import type { Component } from 'solid-js';

export const AppTitle: Component<{ title?: string }> = (props) => {
  const fullTitle = () => (props.title ? `${props.title} - Solid Quality` : 'Solid Quality');

  return <Title>{fullTitle()}</Title>;
};
