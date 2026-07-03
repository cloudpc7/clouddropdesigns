const assetModules = import.meta.glob('../assets/**/*', {
  eager: true,
  import: 'default',
});

const assetUrlByPath = Object.fromEntries(
  Object.entries(assetModules).map(([modulePath, url]) => {
    const normalized = modulePath.replace(/^\.\.\//, '');
    return [normalized, url];
  }),
);

/**
 * Maps RTDB asset paths (e.g. assets/vibenmed/icon.png) to Vite-resolved URLs.
 */
export const resolveAssetUrl = (path) => {
  if (!path || typeof path !== 'string') {
    return path;
  }

  if (/^(https?:|\/|data:|blob:)/.test(path)) {
    return path;
  }

  return assetUrlByPath[path] ?? `/${path}`;
};