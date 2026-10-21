const { google } = require('googleapis');

const INQUIRIES_CALENDAR_NAME = 'Inquiries';
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

const { DEFAULT_INQUIRY_TIMEZONE, normalizeInquiryTimezone } = require('./inquiryTimezones');

const getTimezone = (preferredTimezone) =>
  normalizeInquiryTimezone(preferredTimezone || process.env.INQUIRY_TIMEZONE || DEFAULT_INQUIRY_TIMEZONE);

const getServiceAccountCredentials = () => {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw.trim());
    if (typeof parsed.private_key === 'string' && parsed.private_key.includes('\\n')) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
    }
    return parsed;
  } catch (error) {
    console.error('[Google Calendar] Invalid GOOGLE_SERVICE_ACCOUNT_JSON', error.message);
    return null;
  }
};

const getImpersonateEmail = () =>
  process.env.GOOGLE_CALENDAR_IMPERSONATE_EMAIL || 'cloud@clouddropdesigns.com';

const getCalendarClient = () => {
  const credentials = getServiceAccountCredentials();
  if (!credentials?.client_email || !credentials?.private_key) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [CALENDAR_SCOPE],
    subject: getImpersonateEmail(),
  });

  return google.calendar({ version: 'v3', auth });
};

const BOOKABLE_SLOT_TIMES = (() => {
  const slots = [];

  for (let hour = 7; hour <= 18; hour += 1) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) {
        continue;
      }

      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }

  return slots;
})();

const SLOT_DURATION_MINUTES = 30;

const timeToMinutes = (timeValue) => {
  const [hour, minute] = timeValue.split(':').map((part) => Number(part));
  return hour * 60 + minute;
};

const minutesToTime = (totalMinutes) => {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const minutesFromDateTime = (dateTime, timezone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(dateTime));

  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
  return hour * 60 + minute;
};

const dateFromDateTime = (dateTime, timezone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(dateTime));

  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;
  return `${year}-${month}-${day}`;
};

const getBookedSlotsFromEvents = (events, dateString, timezone) => {
  const booked = new Set();

  for (const event of events) {
    if (event.status === 'cancelled') {
      continue;
    }

    const startDateTime = event.start?.dateTime;
    const endDateTime = event.end?.dateTime;
    if (!startDateTime || !endDateTime) {
      continue;
    }

    if (dateFromDateTime(startDateTime, timezone) !== dateString) {
      continue;
    }

    const eventStart = minutesFromDateTime(startDateTime, timezone);
    const eventEnd = minutesFromDateTime(endDateTime, timezone);

    for (const slot of BOOKABLE_SLOT_TIMES) {
      const slotStart = timeToMinutes(slot);
      const slotEnd = slotStart + SLOT_DURATION_MINUTES;

      if (slotStart < eventEnd && slotEnd > eventStart) {
        booked.add(slot);
      }
    }
  }

  return [...booked].sort();
};

const addMinutesToTime = (timeValue, minutesToAdd) => {
  const [hour, minute] = timeValue.split(':').map((part) => Number(part));
  const totalMinutes = hour * 60 + minute + minutesToAdd;
  const nextHour = Math.floor(totalMinutes / 60);
  const nextMinute = totalMinutes % 60;
  return `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;
};

const resolveInquiriesCalendarId = async (calendar) => {
  const explicitId = process.env.GOOGLE_INQUIRIES_CALENDAR_ID?.trim();
  if (explicitId) {
    return explicitId;
  }

  const calendarName = process.env.GOOGLE_INQUIRIES_CALENDAR_NAME || INQUIRIES_CALENDAR_NAME;
  const { data } = await calendar.calendarList.list({ maxResults: 250 });
  const existing = (data.items || []).find((item) => item.summary === calendarName);

  if (existing?.id) {
    return existing.id;
  }

  const { data: created } = await calendar.calendars.insert({
    requestBody: {
      summary: calendarName,
      description: 'Project inquiry calls scheduled via clouddropdesigns.com',
      timeZone: getTimezone(),
    },
  });

  return created.id;
};

const getInquiryAvailabilityForDate = async (dateString, preferredTimezone) => {
  const calendar = getCalendarClient();
  if (!calendar) {
    return {
      ok: false,
      dryRun: true,
      reason: 'calendar_not_configured',
      bookedSlots: [],
      availableSlots: BOOKABLE_SLOT_TIMES,
    };
  }

  const timezone = getTimezone(preferredTimezone);
  const calendarId = await resolveInquiriesCalendarId(calendar);
  const noonUtc = new Date(`${dateString}T12:00:00.000Z`);
  const timeMin = new Date(noonUtc.getTime() - 14 * 60 * 60 * 1000).toISOString();
  const timeMax = new Date(noonUtc.getTime() + 14 * 60 * 60 * 1000).toISOString();

  const { data } = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const bookedSlots = getBookedSlotsFromEvents(data.items || [], dateString, timezone);
  const bookedSet = new Set(bookedSlots);
  const availableSlots = BOOKABLE_SLOT_TIMES.filter((slot) => !bookedSet.has(slot));

  return {
    ok: true,
    dryRun: false,
    date: dateString,
    timezone,
    bookedSlots,
    availableSlots,
  };
};

const isInquirySlotBooked = async (dateString, timeString, preferredTimezone) => {
  const availability = await getInquiryAvailabilityForDate(dateString, preferredTimezone);
  if (!availability.ok) {
    return false;
  }

  return availability.bookedSlots.includes(timeString);
};

const createInquiryCalendarEvent = async (payload, emailContent) => {
  const calendar = getCalendarClient();
  if (!calendar) {
    console.info('[Google Calendar Dry Run] GOOGLE_SERVICE_ACCOUNT_JSON is not configured.');
    return {
      created: false,
      dryRun: true,
      reason: 'calendar_not_configured',
    };
  }

  if (!payload.preferredDate || !payload.preferredTime) {
    return {
      created: false,
      dryRun: false,
      reason: 'no_preferred_time',
    };
  }

  const timezone = getTimezone(payload.preferredTimezone);
  const calendarId = await resolveInquiriesCalendarId(calendar);
  const endTime = addMinutesToTime(payload.preferredTime, 30);
  const summary = `Project inquiry — ${payload.name}`;

  const { data } = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 0,
    sendUpdates: 'all',
    requestBody: {
      summary,
      description: emailContent.text,
      start: {
        dateTime: `${payload.preferredDate}T${payload.preferredTime}:00`,
        timeZone: timezone,
      },
      end: {
        dateTime: `${payload.preferredDate}T${endTime}:00`,
        timeZone: timezone,
      },
      attendees: [
        {
          email: payload.email,
          displayName: payload.name,
          responseStatus: 'needsAction',
        },
      ],
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      reminders: {
        useDefault: true,
      },
    },
  });

  console.info('[Google Calendar] Created inquiry event', {
    eventId: data.id,
    calendarId,
    htmlLink: data.htmlLink,
  });

  return {
    created: true,
    dryRun: false,
    eventId: data.id,
    htmlLink: data.htmlLink,
    calendarId,
    calendarName: process.env.GOOGLE_INQUIRIES_CALENDAR_NAME || INQUIRIES_CALENDAR_NAME,
  };
};

module.exports = {
  BOOKABLE_SLOT_TIMES,
  createInquiryCalendarEvent,
  getInquiryAvailabilityForDate,
  getServiceAccountCredentials,
  isInquirySlotBooked,
};