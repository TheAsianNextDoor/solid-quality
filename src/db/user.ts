import { capitalizeFirstLetter } from 'utils/stringUtils';

import type { User } from '@prisma/client';

export const computeFullName = (user: User) =>
  `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;
