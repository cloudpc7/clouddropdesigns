const { google } = require('googleapis');

const INQUIRIES_CALENDAR_NAME = 'Inquiries';
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

const getTimezone = () => process.env.INQUIRY_TIMEZONE || 'America/Los_Angeles';

const getServiceAccountCredentials = () => {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('[Google Calendar] Invalid GOOGLE_SERVICE_ACCOUNT_JSON', error);
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

  const timezone = getTimezone();
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
  createInquiryCalendarEvent,
  getServiceAccountCredentials,
};