const INQUIRY_TIMEZONES = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Phoenix', label: 'Arizona (no DST)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'UTC', label: 'UTC' },
];

const ALLOWED_TIMEZONE_VALUES = new Set(INQUIRY_TIMEZONES.map((zone) => zone.value));

const DEFAULT_INQUIRY_TIMEZONE = 'America/Los_Angeles';

const normalizeInquiryTimezone = (value) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (ALLOWED_TIMEZONE_VALUES.has(trimmed)) {
    return trimmed;
  }

  return DEFAULT_INQUIRY_TIMEZONE;
};

const inquiryTimezoneLabel = (value) =>
  INQUIRY_TIMEZONES.find((zone) => zone.value === value)?.label ?? value;

module.exports = {
  ALLOWED_TIMEZONE_VALUES,
  DEFAULT_INQUIRY_TIMEZONE,
  INQUIRY_TIMEZONES,
  inquiryTimezoneLabel,
  normalizeInquiryTimezone,
};