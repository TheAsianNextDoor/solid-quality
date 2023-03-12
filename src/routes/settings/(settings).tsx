import { Protected } from '~/components/protected';

const { Page } = Protected(() => {
  return <>Settings Page</>;
});

export default Page;
