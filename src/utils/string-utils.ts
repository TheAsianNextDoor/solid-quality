import type { User } from '@prisma/client';

export const capitalizeFirstLetter = (str: string | null) => {
  if (!str) {
    return '';
  }
  return str[0].toLocaleUpperCase() + str.slice(1);
};

export const computeFullName = (user: User) => {
  if (user.name) return user.name;

  return `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;
};
