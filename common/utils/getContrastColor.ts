const getContrastColor = (hex: string): string => {
  const cleanHex = hex.replace('#', '');

  const normalizedHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex;

  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? '#000000' : '#ffffff';
};

export default getContrastColor;
