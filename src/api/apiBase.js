const rawBase = import.meta.env.VITE_API_BASE;

/** Empty string (default) means same-origin. Set to the API Gateway URL when /api is not on CloudFront. */
export const API_BASE = typeof rawBase === 'string' ? rawBase.replace(/\/+$/, '') : '';

export const apiUrl = (path) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
};
