const DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL ??
  'https://clouddropdesigns-default-rtdb.firebaseio.com';

const buildUrl = (path) => {
  const normalized = String(path).replace(/^\/+/, '').replace(/\/+$/, '');
  return `${DATABASE_URL}/${normalized}.json`;
};

/**
 * Read a path from Realtime Database (public read rules on /content).
 * @param {string} path e.g. "content" or "content/codeDrops"
 * @returns {Promise<unknown|null>}
 */
const readRtdb = async (path) => {
  const response = await fetch(buildUrl(path));

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`RTDB read failed (${response.status}) for ${path}`);
  }

  const text = await response.text();
  if (!text || text === 'null') {
    return null;
  }

  return JSON.parse(text);
};

module.exports = {
  DATABASE_URL,
  readRtdb,
};