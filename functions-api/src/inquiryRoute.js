const { validateInquiryPayload } = require('./inquiryValidation');
const { buildInquiryEmailContent, sendInquiryEmail } = require('./inquiryEmail');
const { createInquiryCalendarEvent } = require('./googleCalendar');

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map();

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || 'unknown';
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return true;
  }

  bucket.count += 1;
  rateLimitBuckets.set(ip, bucket);
  return false;
};

const verifyTurnstile = async (token, ip) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }

  if (!token) {
    return false;
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return result.success === true;
};

const registerInquiryRoute = (app) => {
  app.post('/api/inquiry', async (req, res, next) => {
    try {
      const ip = getClientIp(req);

      if (isRateLimited(ip)) {
        res.status(429).json({
          error: 'Too many inquiries from this connection. Please try again later.',
        });
        return;
      }

      const validation = validateInquiryPayload(req.body);
      if (!validation.ok) {
        res.status(400).json({
          error: 'Validation failed',
          details: validation.errors,
        });
        return;
      }

      const payload = validation.payload;
      const turnstileOk = await verifyTurnstile(payload.turnstileToken, ip);
      if (!turnstileOk) {
        res.status(403).json({
          error: 'Verification failed. Please try again.',
        });
        return;
      }

      const emailContent = buildInquiryEmailContent(payload);
      const emailResult = await sendInquiryEmail(payload);

      let calendarResult = {
        created: false,
        dryRun: true,
        reason: 'no_preferred_time',
      };

      if (payload.preferredDate && payload.preferredTime) {
        try {
          calendarResult = await createInquiryCalendarEvent(payload, emailContent);
        } catch (calendarError) {
          console.error('[Inquiry Calendar] Failed to create event', calendarError);
          calendarResult = {
            created: false,
            dryRun: false,
            reason: 'calendar_error',
            error: calendarError.message,
          };
        }
      }

      const hasScheduledTime = Boolean(payload.preferredDate && payload.preferredTime);
      let message = emailResult.sent
        ? 'Your inquiry was sent successfully.'
        : 'Your inquiry was received. Email delivery is not configured in this environment.';

      if (hasScheduledTime && calendarResult.created) {
        message = 'Your inquiry was sent. A calendar invite has been added for your requested time.';
      } else if (hasScheduledTime && calendarResult.dryRun) {
        message =
          'Your inquiry was sent. Calendar automation is not configured yet on the server.';
      } else if (hasScheduledTime && calendarResult.reason === 'calendar_error') {
        message =
          'Your inquiry was sent. We could not create the calendar invite automatically — our team will follow up.';
      }

      res.status(emailResult.sent ? 200 : 202).json({
        ok: true,
        sent: emailResult.sent,
        dryRun: emailResult.dryRun,
        message,
        calendarEventCreated: calendarResult.created === true,
        calendarDryRun: calendarResult.dryRun === true,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = {
  registerInquiryRoute,
};