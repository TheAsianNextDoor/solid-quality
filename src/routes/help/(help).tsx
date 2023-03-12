import { Protected } from '~/components/protected';

const { Page } = Protected(() => {
  return <>Help Page</>;
});

export default Page;
