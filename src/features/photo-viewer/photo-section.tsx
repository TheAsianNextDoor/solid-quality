import { useSearchParams } from 'solid-start';

import { CloseButton } from './close-button';
import { LeftNavigateButton } from './left-navigate-button';
import { RightNavigateButton } from './right-navigate-button';

import type { Photo, User } from '@prisma/client';
import type { Component, Setter } from 'solid-js';

interface props {
  selectedPhotoIndex: number;
  setSelectedPhotoIndex: Setter<number>;
  photosWithSignedUrl: (Photo & { url: string; user: User })[] | undefined;
  selectedPhoto: (Photo & { url: string; user: User }) | undefined;
}

export const PhotoSection: Component<props> = (props) => {
  const [_, setSearchParams] = useSearchParams();

  const isStartOfAlbum = () => {
    if (!props.photosWithSignedUrl?.length) {
      return false;
    }

    return props.selectedPhotoIndex <= 0;
  };

  const isEndOfAlbum = () => {
    if (!props.photosWithSignedUrl?.length) {
      return false;
    }

    return props.selectedPhotoIndex >= (props.photosWithSignedUrl?.length as number) - 1;
  };

  const handleBackClick = () => {
    const photoId = props?.photosWithSignedUrl?.[props.selectedPhotoIndex].id || 'unknown';
    props.setSelectedPhotoIndex((prev) => prev - 1);
    setSearchParams({ photoId });
  };

  const handleForwardClick = () => {
    const photoId = props?.photosWithSignedUrl?.[props.selectedPhotoIndex].id || 'unknown';
    props.setSelectedPhotoIndex((prev) => prev + 1);
    setSearchParams({ photoId });
  };

  return (
    <div class="flex justify-center relative align-middle w-full h-full bg-neutral-900">
      <CloseButton />
      <LeftNavigateButton shouldShow={!isStartOfAlbum()} handleClick={handleBackClick} />
      <img src={props.selectedPhoto?.url} />
      <RightNavigateButton shouldShow={!isEndOfAlbum()} handleClick={handleForwardClick} />
      <div />
    </div>
  );
};
