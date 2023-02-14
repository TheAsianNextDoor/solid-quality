import type { Comment, User } from '@prisma/client';

export type CommentWithUser = Comment & {
  user: User;
};
