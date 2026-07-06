const escapeIcsText = (value) =>
  String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');

const formatIcsLocalDateTime = (dateString, timeString) => {
  const [year, month, day] = dateString.split('-');
  const [hour, minute] = timeString.split(':');
  return `${year}${month}${day}T${hour}${minute}00`;
};

const addMinutesToTime = (timeString, minutesToAdd) => {
  const [hour, minute] = timeString.split(':').map((part) => Number(part));
  const totalMinutes = hour * 60 + minute + minutesToAdd;
  const nextHour = Math.floor(totalMinutes / 60);
  const nextMinute = totalMinutes % 60;
  return `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;
};

const buildInquiryMeetingIcs = ({
  uid,
  title,
  description,
  preferredDate,
  preferredTime,
  timezone = 'America/Los_Angeles',
  durationMinutes = 30,
}) => {
  const dtstart = formatIcsLocalDateTime(preferredDate, preferredTime);
  const endTime = addMinutesToTime(preferredTime, durationMinutes);
  const dtend = formatIcsLocalDateTime(preferredDate, endTime);
  const timestamp = `${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CloudDropDesigns//Project Inquiry//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART;TZID=${timezone}:${dtstart}`,
    `DTEND;TZID=${timezone}:${dtend}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
};

module.exports = {
  buildInquiryMeetingIcs,
};