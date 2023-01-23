import { Modal as MuiModal } from '@suid/material';

import type { ModalProps } from '@suid/material/Modal';
import type { Component } from 'solid-js';

export const Modal: Component<ModalProps> = (props) => {
  return <MuiModal {...props} />;
};
