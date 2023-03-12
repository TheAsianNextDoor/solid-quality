import { IconButton as MuiIconButton } from '@suid/material';

import type { IconButtonProps } from '@suid/material/IconButton';
import type { Component } from 'solid-js';

export const IconButton: Component<IconButtonProps> = (props) => {
  return <MuiIconButton {...props} />;
};
