import { apiUrl } from './apiBase';

export const fetchAllContent = async () => {
  const response = await fetch(apiUrl('/api/content'));

  if (!response.ok) {
    throw new Error(`Content API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
