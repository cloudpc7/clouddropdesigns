export const fetchInquiryAvailability = async (date) => {
  const response = await fetch(`/api/inquiry/availability?date=${encodeURIComponent(date)}`, {
    headers: { Accept: 'application/json' },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Unable to load availability for that date.');
  }

  return data;
};

export const submitProjectInquiry = async (payload) => {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.error ||
      (Array.isArray(data.details) ? data.details.join(' ') : null) ||
      'Unable to send your inquiry right now. Please try again.';
    throw new Error(message);
  }

  return data;
};