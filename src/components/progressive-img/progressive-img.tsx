import { Skeleton } from '@suid/material';
import { createSignal } from 'solid-js';

import type { Component } from 'solid-js';

export const ProgressiveImg: Component<Partial<HTMLImageElement>> = (props) => {
  const [loaded, setLoaded] = createSignal(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <Skeleton
        variant="rectangular"
        style={{ display: loaded() ? 'none' : 'block' }}
        width={props.width}
        height={props.height}
      />
      <img
        style={{
          display: !loaded() ? 'none' : 'block',
          width: `${props.width}px` || '300px',
          height: `${props.height}px` || '300px',
          'object-fit': 'cover',
          'border-radius': '5%',
        }}
        src={props.src}
        onLoad={handleLoad}
      />
    </>
  );
};
