import { Skeleton } from '@suid/material';
import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

export const ProgressiveImg: Component<Partial<HTMLImageElement>> = (props) => {
  const [loaded, setLoaded] = createSignal(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <Show when={!loaded()}>
        <div
          style={{
            'max-width': `${props.width}px`,
            'max-height': `${props.height}px`,
          }}
        >
          <Skeleton
            variant="rectangular"
            style={{
              display: loaded() ? 'none' : 'block',
              'max-width': `${props.width}px`,
              'max-height': `${props.height}px`,
            }}
            height={`${props.height}px`}
          />
        </div>
      </Show>
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
