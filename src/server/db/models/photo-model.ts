import { prisma } from '~/server/db/client';

import type { Prisma } from '@prisma/client';

export const PhotoModel = {
  count: (options: Prisma.PhotoCountArgs) => prisma.photo.count(options),
  create: (options: Prisma.PhotoCreateArgs) => prisma.photo.create(options),
  createMany: (options: Prisma.PhotoCreateManyArgs) => prisma.photo.createMany(options),
  deleteFirst: (options: Prisma.PhotoDeleteArgs) => prisma.photo.delete(options),
  findFirst: (options: Prisma.PhotoFindFirstArgs) => prisma.photo.findFirst(options),
  findMany: (options: Prisma.PhotoFindManyArgs) => prisma.photo.findMany(options),
  update: (options: Prisma.PhotoUpdateArgs) => prisma.photo.update(options),
  updateMany: (options: Prisma.PhotoUpdateManyArgs) => prisma.photo.updateMany(options),
};
