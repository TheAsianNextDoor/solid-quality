import { useSearchParams } from 'solid-start';

import { trpcClient } from '~/utils/trpc';

export default function TaskPhoto() {
  const [searchParams] = useSearchParams();

  const signedUrlsQuery = trpcClient.photo.signedGetUrlsByTask.useQuery(() => ({ taskId: searchParams.taskId }), {
    enabled: !!searchParams.taskId,
  });

  const selectedPhoto = () => {
    const photoId = signedUrlsQuery?.data?.findIndex((photo) => photo.id === searchParams.photoId) as number;

    return signedUrlsQuery?.data && signedUrlsQuery?.data[photoId];
  };

  return (
    <div class="flex">
      <img width="100px" height="100px" src={selectedPhoto()?.url} />
      {/* <Typography id="modal-modal-title" variant="h6" component="h2"> */}
      <div class="flex flex-col">
        <div>Name: {selectedPhoto()?.name}</div>
        <div>CreatedAt: {selectedPhoto()?.createdAt.toString()}</div>
        <div>Type: {selectedPhoto()?.mimeType}</div>
        <div>UserId: {selectedPhoto()?.userId}</div>
      </div>
    </div>
  );
}
