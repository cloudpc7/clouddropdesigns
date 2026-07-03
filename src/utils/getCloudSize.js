/** Business card hero — mobile / card flip layout */
export const getCardHeroCloudSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isCompactViewport = width < 1024;

  if (!isCompactViewport) {
    return 240;
  }

  const byWidth = width < 380 ? 168 : width < 480 ? 196 : width < 768 ? 228 : 228;
  const byHeight = Math.floor(height * 0.19);
  const availableWidth = width - 56;
  const maxByWidth = Math.floor((availableWidth - 20) / 1.12);

  return Math.min(byWidth, byHeight, maxByWidth, 228);
};

/** Studio website home hero — tablet / desktop wide layout (768px+) */
export const getWideHeroCloudSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const byWidth =
    width < 820
      ? 188
      : width < 900
        ? 204
        : width < 1024
          ? 220
          : width < 1200
            ? 248
            : width < 1440
              ? 272
              : 296;

  const byHeight = Math.floor(height * 0.2);
  const columnCap = Math.floor((Math.min(width * 0.38, 480) - 24) / 1.12);

  return Math.min(byWidth, byHeight, columnCap);
};