import { Button as MuiButton } from '@suid/material';

import type { ButtonProps } from '@suid/material/Button';
import type { Component } from 'solid-js';

export const Button: Component<ButtonProps> = (props) => {
  return <MuiButton {...props} />;
};
