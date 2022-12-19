import { Avatar as MuiAvatar } from '@suid/material';

import type { AvatarProps } from '@suid/material/Avatar';
import type { Component } from 'solid-js';

export const Avatar: Component<AvatarProps> = (props) => {
  return (
    <MuiAvatar
      sx={{
        width: 48,
        height: 48,
      }}
      {...props}
    />
  );
};
