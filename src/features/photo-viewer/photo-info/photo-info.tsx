import { Show } from 'solid-js';

import { ProfilePicture } from '~/components/profile-picture';
import { formatDateTimeForPFP } from '~/utils/time-utils';

import { EditDescription } from './edit-description';
import { MoreButton } from './more-button';

import type { Photo, User } from '@prisma/client';
import type { Component } from 'solid-js';

interface props {
  selectedPhoto: (Photo & { url: string; user: User }) | undefined;
}

export const PhotoInfo: Component<props> = (props) => {
  return (
    <div class="flex h-full flex-col  bg-stone-100 p-5" style={{ width: '40rem' }}>
      <Show when={props.selectedPhoto} keyed>
        {(photo) => (
          <>
            <div class="flex items-center">
              <ProfilePicture src={photo.user.image as string} />
              <div class="pl-2">
                <div>{photo.user.name}</div>
                <div>{formatDateTimeForPFP(photo.createdAt)}</div>
              </div>
              <div class="ml-auto">
                <MoreButton />
              </div>
            </div>

            <EditDescription selectedPhoto={photo} />
          </>
        )}
      </Show>
    </div>
  );
};
