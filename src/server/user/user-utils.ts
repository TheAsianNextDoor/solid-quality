import { capitalizeFirstLetter } from 'utils/string-utils';

import type { User } from '@prisma/client';

export const computeFullName = (user: User) => {
  if (user.name) return user.name;

  return `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;
};
