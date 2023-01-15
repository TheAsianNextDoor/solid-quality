export const capitalizeFirstLetter = (str: string | null) => {
  if (!str) {
    return '';
  }
  return str[0].toLocaleUpperCase() + str.slice(1);
};
