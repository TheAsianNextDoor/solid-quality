import { TextField as MuiTextField } from '@suid/material';

import type { TextFieldProps } from '@suid/material/TextField';
import type { Component } from 'solid-js';

export const TextField: Component<TextFieldProps> = (props) => {
  return <MuiTextField fullWidth {...props} />;
};
