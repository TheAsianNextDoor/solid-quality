import { A } from 'solid-start';

import { Protected } from '~/components/protected';

const { Page } = Protected(() => {
  return (
    <>
      <div>
        <A href="/inspection/1/edit">Inspection 1</A>
      </div>
      <div>
        <A href="/inspection/2/edit">Inspection 2</A>
      </div>
    </>
  );
});

export default Page;
