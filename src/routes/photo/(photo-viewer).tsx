import { Show, createSignal, onMount } from 'solid-js';
import { useSearchParams } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { InfoSection, PhotoSection } from '~/features/photo-viewer';
import { trpcClient } from '~/utils/trpc';

export default function TaskPhoto() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = createSignal(0);
  const [searchParams] = useSearchParams();

  const photosWithSignedUrlQuery = trpcClient.photo.signedGetUrlsByTask.useQuery(
    () => ({ taskId: searchParams.taskId }),
    {
      enabled: !!searchParams.taskId,
    },
  );

  onMount(() => {
    // preload images
    photosWithSignedUrlQuery?.data?.forEach(({ url }) => {
      new Image().src = url;
    });

    const photoIndex = photosWithSignedUrlQuery?.data?.findIndex((photo) => photo.id === searchParams.photoId);

    if (!photoIndex) {
      console.error('missing photo: ', searchParams.photoId);
    } else {
      setSelectedPhotoIndex(photoIndex);
    }
  });

  const selectedPhoto = () => {
    return photosWithSignedUrlQuery?.data && photosWithSignedUrlQuery?.data[selectedPhotoIndex()];
  };

  return (
    <Show when={!!selectedPhoto()?.url} fallback={<Spinner />}>
      <div class="flex w-full h-full">
        <PhotoSection
          photosWithSignedUrl={photosWithSignedUrlQuery.data}
          selectedPhoto={selectedPhoto()}
          selectedPhotoIndex={selectedPhotoIndex()}
          setSelectedPhotoIndex={setSelectedPhotoIndex}
        />
        <InfoSection selectedPhoto={selectedPhoto()} />
      </div>
    </Show>
  );
}
