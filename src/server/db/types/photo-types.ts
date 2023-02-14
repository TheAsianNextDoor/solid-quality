import type { Photo } from '@prisma/client';

export type PhotoWithUrl = Photo & {
  url: string;
};
