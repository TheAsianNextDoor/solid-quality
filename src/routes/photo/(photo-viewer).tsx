import { Show, createEffect, createSignal, onMount } from 'solid-js';
import { useSearchParams } from 'solid-start';

import { Spinner } from '~/components/lib/spinner';
import { Protected } from '~/components/protected';
import { PhotoInfo, PhotoSection } from '~/features/photo-viewer';
import { photoResource } from '~/requests/photo-resource';

const { Page } = Protected(() => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = createSignal(0);
  const [searchParams] = useSearchParams();

  const photosWithSignedUrlQuery = photoResource.queries.useGetSignedGetUrlsByTask(() => ({
    taskId: searchParams.taskId,
  }));

  onMount(() => {
    // preload images
    photosWithSignedUrlQuery?.data?.forEach(({ url }) => {
      new Image().src = url;
    });

    const photoIndex = photosWithSignedUrlQuery?.data?.findIndex((photo) => photo.id === searchParams.photoId);
    setSelectedPhotoIndex(photoIndex || 0);
  });

  createEffect(() => {
    // select correct image on forward and nav browser buttons
    const photoIndex = photosWithSignedUrlQuery?.data?.findIndex((photo) => photo.id === searchParams.photoId);
    setSelectedPhotoIndex(photoIndex || 0);
  });

  const selectedPhoto = () => {
    return photosWithSignedUrlQuery?.data?.[selectedPhotoIndex() || 0];
  };

  return (
    <Show when={selectedPhoto()} fallback={<Spinner />} keyed>
      {(photo) => (
        <div class="flex h-full w-full">
          <PhotoSection
            photosWithSignedUrl={photosWithSignedUrlQuery.data}
            selectedPhoto={photo}
            selectedPhotoIndex={selectedPhotoIndex()}
            setSelectedPhotoIndex={setSelectedPhotoIndex}
          />
          <PhotoInfo selectedPhoto={photo} />
        </div>
      )}
    </Show>
  );
});

export default Page;
