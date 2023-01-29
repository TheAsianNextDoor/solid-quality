import { MenuItem as MuiMenuItem } from '@suid/material';

import type { MenuItemProps } from '@suid/material/MenuItem';
import type { Component } from 'solid-js';

export const MenuItem: Component<MenuItemProps> = (props) => {
  return <MuiMenuItem {...props} />;
};
