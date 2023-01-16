import { prisma } from '~/server/db/client';

import type { Prisma } from '@prisma/client';

export const UserModel = {
  count: (options: Prisma.UserCountArgs) => prisma.user.count(options),
  create: (options: Prisma.UserCreateArgs) => prisma.user.create(options),
  createMany: (options: Prisma.UserCreateManyArgs) => prisma.user.createMany(options),
  deleteFirst: (options: Prisma.UserDeleteArgs) => prisma.user.delete(options),
  findFirst: (options: Prisma.UserFindFirstArgs) => prisma.user.findFirst(options),
  findMany: (options: Prisma.UserFindManyArgs) => prisma.user.findMany(options),
  findUnique: (options: Prisma.UserFindUniqueArgs) => prisma.user.findUnique(options),
  update: (options: Prisma.UserUpdateArgs) => prisma.user.update(options),
  updateMany: (options: Prisma.UserUpdateManyArgs) => prisma.user.updateMany(options),
};
