const CONTENT_ENDPOINT = '/api/content';

export const fetchAllContent = async () => {
  const response = await fetch(CONTENT_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Content API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};