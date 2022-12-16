import { Typography as MaterialTypography } from '@suid/material';

import type { TypographyProps } from '@suid/material/Typography';
import type { Component } from 'solid-js';

export const Typography: Component<TypographyProps> = (props) => {
  return <MaterialTypography {...props}>{props.children}</MaterialTypography>;
};
