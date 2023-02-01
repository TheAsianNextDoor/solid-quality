import { useNavigate, useSearchParams } from 'solid-start';

import { LeftNavigateButton } from './left-navigate-button';
import { RightNavigateButton } from './right-navigate-button';
import { CloseButton } from '../../../components/icons/close-button';

import type { Photo, User } from '@prisma/client';
import type { Component, Setter } from 'solid-js';

interface props {
  selectedPhotoIndex: number;
  setSelectedPhotoIndex: Setter<number>;
  photosWithSignedUrl: (Photo & { url: string; user: User })[] | undefined;
  selectedPhoto: (Photo & { url: string; user: User }) | undefined;
}

export const PhotoSection: Component<props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

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
    props.setSelectedPhotoIndex((prev) => prev - 1);
    const photoId = props?.photosWithSignedUrl?.[props.selectedPhotoIndex].id || 'unknown';
    setSearchParams({ photoId });
  };

  const handleForwardClick = () => {
    props.setSelectedPhotoIndex((prev) => prev + 1);
    const photoId = props?.photosWithSignedUrl?.[props.selectedPhotoIndex].id || 'unknown';
    setSearchParams({ photoId });
  };

  return (
    <div class="relative flex h-full w-full justify-center bg-neutral-900 align-middle">
      <div
        class="absolute top-0 left-0 ml-10 mt-10 cursor-pointer"
        style={{
          width: '40px',
          background: 'rgba(0, 0, 0, 0.20)',
          'border-radius': '50%',
        }}
      >
        <CloseButton handleClick={() => nav(`/task/${searchParams.taskId}?tab=photos`)} />
      </div>
      <LeftNavigateButton shouldShow={!isStartOfAlbum()} handleClick={handleBackClick} />
      <img src={props.selectedPhoto?.url} />
      <RightNavigateButton shouldShow={!isEndOfAlbum()} handleClick={handleForwardClick} />
      <div />
    </div>
  );
};
