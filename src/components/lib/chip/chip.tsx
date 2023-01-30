import { Chip as MuiChip } from '@suid/material';

import type { ChipProps } from '@suid/material/Chip';
import type { Component } from 'solid-js';

export const Chip: Component<ChipProps> = (props) => {
  return <MuiChip {...props} />;
};
