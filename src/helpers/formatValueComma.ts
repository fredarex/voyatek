export const formatNumber = (value: number, decimalPlaces: number = 0): string => {
  const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
  });
  return formatter.format(value);
};
