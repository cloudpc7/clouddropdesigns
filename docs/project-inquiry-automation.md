# Project Inquiry Form — Automated Email & Calendar

Phase 1 is implemented. The form posts to `POST /api/inquiry`, sends email through SMTP (same pattern as VibeNMED), and attaches a `.ics` calendar file when the visitor selects both a date and time.

---

## What runs today

```
User submits form
       ↓
POST /api/inquiry
       ↓
Validate + rate limit + optional Turnstile
       ↓
Send notification email to cloud@clouddropdesigns.com
       ↓
Date + time provided?
   Yes → Attach project-inquiry-meeting.ics
   No  → Email only
       ↓
Return success to browser
```

### Email provider

VibeNMED uses **nodemailer + SMTP** via Firebase secrets:

- `SMTP_HOST`
- `SMTP_PORT` (usually `587`)
- `SMTP_USER`
- `SMTP_PASS`

CloudDropDesigns inquiry email uses the same secrets on the `clouddropdesigns` Firebase project.

### From address (for Gmail filters)

Messages are sent with plus-addressing so you can filter by project type in Gmail:

| Project type | From address |
|--------------|--------------|
| Web application | `cloud+web-inquiry@clouddropdesigns.com` |
| Mobile application | `cloud+mobile-inquiry@clouddropdesigns.com` |
| Web and mobile | `cloud+web-mobile-inquiry@clouddropdesigns.com` |
| Not sure yet | `cloud+project-inquiry@clouddropdesigns.com` |

Display name example: `Web Application Inquiry`

Subject example: `[Web Application Inquiry] Jane Doe`

**Gmail filter tip:** create filters for `to:cloud+web-inquiry@clouddropdesigns.com`, etc.

SMTP still authenticates with `SMTP_USER` (your Google account). Plus-addressing delivers to the same inbox without creating Workspace aliases.

### Calendar (Phase 2 — code deployed, Workspace setup required)

When both date and time are selected:

- An event is created on your **Inquiries** Google Calendar automatically
- The **visitor is invited** by email (Google Calendar invite)
- No `.ics` attachment on the notification email

**Setup guide:** [`google-calendar-workspace-setup.md`](./google-calendar-workspace-setup.md)

- Times use **Pacific Time** (`America/Los_Angeles`)
- Duration: **30 minutes**

---

## Setup checklist

### 1. Set SMTP secrets on CloudDropDesigns Firebase

Firebase-managed secrets **cannot be copied** from VibeNMED (values are not readable after save). Create a new **Google App Password** and set all four secrets fresh.

**Full guide:** [`smtp-secrets-from-vibenmed.md`](./smtp-secrets-from-vibenmed.md).

```bash
firebase functions:secrets:set SMTP_HOST --project clouddropdesigns   # smtp.gmail.com
firebase functions:secrets:set SMTP_PORT --project clouddropdesigns   # 587
firebase functions:secrets:set SMTP_USER --project clouddropdesigns   # cloud@clouddropdesigns.com
firebase functions:secrets:set SMTP_PASS --project clouddropdesigns   # new App Password from Google Account
```

Typical Google Workspace / Gmail SMTP values:

- Host: `smtp.gmail.com`
- Port: `587`
- User: `cloud@clouddropdesigns.com`
- Pass: Google App Password (not your normal login password)

If SMTP is not configured, the API still accepts submissions but logs a **dry run** instead of sending email.

### 2. Deploy the API function

```bash
cd functions-api
npm install
cd ..
firebase deploy --only functions:api --project clouddropdesigns
```

### 3. Optional — Cloudflare Turnstile (bot protection)

1. Create a Turnstile site at https://dash.cloudflare.com/
2. Add the site key to the frontend build:

```bash
# .env.production (or CI secret)
VITE_TURNSTILE_SITE_KEY=your_site_key
```

3. Bind the secret to the function (requires adding `TURNSTILE_SECRET_KEY` to `functions-api/index.js` secrets array, then):

```bash
firebase functions:secrets:set TURNSTILE_SECRET_KEY --project clouddropdesigns
```

If Turnstile is not configured, verification is skipped.

### 4. Optional environment overrides

These use defaults and do not need secrets unless you want to override them:

| Variable | Default |
|----------|---------|
| `INQUIRY_TO_EMAIL` | `cloud@clouddropdesigns.com` |
| `INQUIRY_EMAIL_MAILBOX` | `cloud` |
| `INQUIRY_EMAIL_DOMAIN` | `clouddropdesigns.com` |
| `INQUIRY_TIMEZONE` | `America/Los_Angeles` |

---

## API reference

**`POST /api/inquiry`**

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Acme Inc",
  "phone": "555-0100",
  "projectType": "web",
  "description": "We need a new marketing site.",
  "preferredDate": "2026-07-10",
  "preferredTime": "14:00",
  "availabilityNotes": "Alternate: weekday mornings PT",
  "timeline": "1-3",
  "budget": "5-15k",
  "serviceLabel": "Brand refresh",
  "turnstileToken": ""
}
```

**Success response**

```json
{
  "ok": true,
  "sent": true,
  "dryRun": false,
  "message": "Your inquiry was sent successfully.",
  "calendarInviteAttached": true
}
```

---

## Relevant files

| Area | Path |
|------|------|
| Inquiry form | `src/components/studio/ProjectStartInquiryForm.jsx` |
| Client API | `src/api/inquiryApi.js` |
| Turnstile widget | `src/components/studio/InquiryTurnstile.jsx` |
| Inquiry route | `functions-api/src/inquiryRoute.js` |
| Email + from address | `functions-api/src/inquiryEmail.js` |
| ICS builder | `functions-api/src/inquiryIcs.js` |
| Validation | `functions-api/src/inquiryValidation.js` |
| Express app | `functions-api/src/app.js` |
| VibeNMED SMTP reference | `../vibenmed/functions/index.js` |
| Company inbox | `cloud@clouddropdesigns.com` |