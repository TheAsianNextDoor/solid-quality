import { MenuItem } from '@suid/material';

import type { MenuItemProps } from '@suid/material/MenuItem';
import type { Component } from 'solid-js';

export const SelectItem: Component<MenuItemProps> = (props) => {
  return <MenuItem {...props} />;
};
