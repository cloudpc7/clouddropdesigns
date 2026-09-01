const formatTimeLabel = (hour24, minute) => {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
};

export const PROJECT_INQUIRY_TIME_SLOTS = (() => {
  const slots = [{ value: '', label: 'Select a time' }];

  for (let hour = 7; hour <= 18; hour += 1) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) {
        continue;
      }

      slots.push({
        value: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
        label: formatTimeLabel(hour, minute),
      });
    }
  }

  return slots;
})();

export const DEFAULT_INQUIRY_TIMEZONE = 'America/Los_Angeles';

export const PROJECT_INQUIRY_TIMEZONES = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Phoenix', label: 'Arizona (no DST)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'UTC', label: 'UTC' },
];

export const getDefaultInquiryTimezone = () => {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (PROJECT_INQUIRY_TIMEZONES.some((zone) => zone.value === detected)) {
      return detected;
    }
  } catch {
    // Fall back to studio default below.
  }

  return DEFAULT_INQUIRY_TIMEZONE;
};

export const inquiryTimezoneLabel = (value) =>
  PROJECT_INQUIRY_TIMEZONES.find((zone) => zone.value === value)?.label ?? value;

export const PROJECT_INQUIRY_SCHEDULE_HINT =
  'Monday–Saturday, 7:00 AM–6:00 PM in your selected timezone (30-minute slots).';

export const INQUIRY_WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const parseInquiryDate = (dateString) => {
  if (!dateString) {
    return null;
  }

  return new Date(`${dateString}T12:00:00`);
};

export const toInquiryDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatInquiryDateDisplay = (dateString) => {
  const date = parseInquiryDate(dateString);
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const isValidInquiryWeekday = (dateString) => {
  if (!dateString) {
    return true;
  }

  const day = parseInquiryDate(dateString)?.getDay();
  return day >= 1 && day <= 6;
};

export const isSelectableInquiryDate = (date) => {
  const candidate = new Date(date);
  candidate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (candidate < today) {
    return false;
  }

  const day = candidate.getDay();
  return day >= 1 && day <= 6;
};

export const buildInquiryCalendarWeeks = (year, month) => {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstOfMonth.getDay();
  const weeks = [];
  let currentWeek = [];

  for (let index = 0; index < startOffset; index += 1) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    currentWeek.push(new Date(year, month, day));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

export const inquiryTimeLabel = (value) =>
  PROJECT_INQUIRY_TIME_SLOTS.find((slot) => slot.value === value)?.label ?? value;