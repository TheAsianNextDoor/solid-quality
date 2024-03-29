import { Show } from 'solid-js';
import { useSearchParams, useNavigate } from 'solid-start';

import { CloseButton } from '~/components/icons';
import { Typography } from '~/components/lib/typography';
import { Protected } from '~/components/protected';
import { attachmentResource } from '~/requests/attachment-resource';

const { Page } = Protected(() => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const attachmentWithSignedUrlQuery = attachmentResource.queries.useGetSignedGetUrlById(() => ({
    attachmentId: searchParams.attachmentId,
  }));

  return (
    <div class="flex h-full w-full flex-col items-center justify-center bg-slate-900">
      <CloseButton handleClick={() => nav(`/task/${searchParams.taskId}?tab=attachments`)} />
      <Show when={attachmentWithSignedUrlQuery.isSuccess}>
        <div>
          <Typography class="text-slate-200" variant="h4" width="min-content">
            {attachmentWithSignedUrlQuery?.data?.name?.trim()}
          </Typography>
        </div>
        <iframe src={attachmentWithSignedUrlQuery?.data?.url} width="90%" height="90%" />
      </Show>
    </div>
  );
});

export default Page;
