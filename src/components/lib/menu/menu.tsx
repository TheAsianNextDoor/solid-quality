import { Menu as MuiMenu } from '@suid/material';

import type { MenuProps } from '@suid/material/Menu';
import type { Component } from 'solid-js';

export const Menu: Component<MenuProps> = (props) => {
  return <MuiMenu {...props} />;
};
