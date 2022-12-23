import type { Comment } from 'db/comment/comment';

export const sortCommentsFromOldToNew = (comments: Comment[]) => {
  return comments.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};
