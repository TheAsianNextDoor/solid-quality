import { ProfilePicture } from '~/components/profile-picture';
import { formatDateTimeForPFP } from '~/utils/time-utils';

import { MoreButton } from './more-button';

import type { Photo, User } from '@prisma/client';
import type { Component } from 'solid-js';

interface props {
  selectedPhoto: (Photo & { url: string; user: User }) | undefined;
}

export const PhotoInfo: Component<props> = (props) => {
  return (
    <div class="mt-5 p-5 flex flex-col  bg-stone-100 h-full" style={{ width: '40rem' }}>
      <div class="flex items-center">
        <ProfilePicture src={props.selectedPhoto?.user?.image as string} />
        <div class="pl-2">
          <div>{props.selectedPhoto?.user?.name}</div>
          <div>{formatDateTimeForPFP(props.selectedPhoto?.createdAt)}</div>
        </div>
        <div class="ml-auto">
          <MoreButton />
        </div>
      </div>
      <div class="mt-5">Photo Name: {props.selectedPhoto?.name}</div>
      <div>Type: {props.selectedPhoto?.mimeType}</div>
    </div>
  );
};
