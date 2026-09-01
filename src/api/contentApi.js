import { apiUrl } from './apiBase';

const CONTENT_ENDPOINT = apiUrl('/api/content');

export const fetchAllContent = async () => {
  const response = await fetch(CONTENT_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Content API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
