import { createEffect, on } from 'solid-js';
import toast from 'solid-toast';

import type { RouteAction } from 'solid-start/data/createRouteAction';

export const useToastRequest = (props: RouteAction<unknown, unknown>[0]) => {
  createEffect(
    on(
      () => props.error,
      () => {
        if (props.error) {
          toast('Request Failed', { style: { background: 'red' } });
        }
      },
    ),
  );

  createEffect(
    on(
      () => props.result,
      () => {
        if (props.result) {
          toast('Request Success', { style: { background: 'green' } });
        }
      },
    ),
  );
};
