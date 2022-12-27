import type { Prisma } from '@prisma/client';

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: { user: true };
}>;

export type CommentCreateData = Prisma.CommentUncheckedCreateInput;
