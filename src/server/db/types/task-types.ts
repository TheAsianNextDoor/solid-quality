import type { Prisma } from '@prisma/client';

export type TaskWithLinks = Prisma.TaskGetPayload<{
  include: { Links: true };
}>;
