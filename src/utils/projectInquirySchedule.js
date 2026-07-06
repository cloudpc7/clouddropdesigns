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

export const PROJECT_INQUIRY_SCHEDULE_HINT =
  'Monday–Saturday, 7:00 AM–6:00 PM (30-minute slots).';

export const isValidInquiryWeekday = (dateString) => {
  if (!dateString) {
    return true;
  }

  const day = new Date(`${dateString}T12:00:00`).getDay();
  return day >= 1 && day <= 6;
};

export const inquiryTimeLabel = (value) =>
  PROJECT_INQUIRY_TIME_SLOTS.find((slot) => slot.value === value)?.label ?? value;