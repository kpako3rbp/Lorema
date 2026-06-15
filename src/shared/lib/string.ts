export const capitalizeFirstLetter = (value: string): string => {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const numberWithSpaces = (number: number) => {
  const nbsp = '\xa0';

  const negativePrefix = number < 0 ? `-${nbsp}` : '';
  const str = Math.abs(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, nbsp);

  return `${negativePrefix}${str}`;
};
