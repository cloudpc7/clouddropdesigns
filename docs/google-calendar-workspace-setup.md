# Google Calendar Auto-Booking (Workspace) — Setup Guide

When a visitor selects a **date and time** on the project inquiry form, the server:

1. Sends the notification email (same as Phase 1)
2. Creates an event on your **Inquiries** Google Calendar
3. Invites the **visitor by email** (Google sends them a calendar invite)
4. Does **not** attach an `.ics` file

Until this is configured, inquiries still send email; calendar creation logs a dry run.

---

## Prerequisites

- Google Workspace account: `cloud@clouddropdesigns.com`
- **Workspace super admin** access (for domain-wide delegation)
- Firebase project: `clouddropdesigns`
- SMTP secrets already working (Phase 1)

---

## Step 1 — Enable Google Calendar API

1. Open [Google Cloud Console](https://console.cloud.google.com/) → project **`clouddropdesigns`**
2. **APIs & Services** → **Library**
3. Search **Google Calendar API** → **Enable**

Direct link: [Enable Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com?project=clouddropdesigns)

---

## Step 2 — Create a service account

1. **IAM & Admin** → **Service Accounts**
2. **Create service account**
   - Name: `inquiry-calendar`
   - ID: `inquiry-calendar` (or similar)
3. Skip optional role grants for now → **Done**
4. Open the new service account → **Keys** tab
5. **Add key** → **Create new key** → **JSON** → download the file  
   Keep this file private. You will paste its contents into a Firebase secret.

6. Copy the service account **Client ID** (numeric) from the service account details page — you need it for Workspace Admin in Step 3.

---

## Step 3 — Domain-wide delegation (Workspace Admin)

1. Open [Google Workspace Admin](https://admin.google.com/)
2. **Security** → **Access and data control** → **API controls**
3. **Manage Domain Wide Delegation** → **Add new**
4. **Client ID:** paste the numeric Client ID from Step 2
5. **OAuth scopes** (one line):

```
https://www.googleapis.com/auth/calendar
```

6. **Authorize**

This allows the service account to act on behalf of `cloud@clouddropdesigns.com` for calendar access.

---

## Step 4 — Store the service account JSON in Firebase

Paste the **entire contents** of the downloaded JSON file as one secret:

```bash
firebase functions:secrets:set GOOGLE_SERVICE_ACCOUNT_JSON --project clouddropdesigns
```

When prompted, paste the full JSON (starts with `{ "type": "service_account", ... }`).

Optional overrides (defaults are fine for most setups):

| Variable | Default |
|----------|---------|
| `GOOGLE_CALENDAR_IMPERSONATE_EMAIL` | `cloud@clouddropdesigns.com` |
| `GOOGLE_INQUIRIES_CALENDAR_NAME` | `Inquiries` |
| `GOOGLE_INQUIRIES_CALENDAR_ID` | auto — finds or creates **Inquiries** calendar |
| `INQUIRY_TIMEZONE` | `America/Los_Angeles` |

---

## Step 5 — Deploy

```bash
firebase deploy --only functions:api --project clouddropdesigns
```

Or push to `development` and let CI deploy.

**Note:** `GOOGLE_SERVICE_ACCOUNT_JSON` must exist before deploy succeeds (it is listed in the function secrets).

---

## Step 6 — Test

1. Submit the inquiry form with a **future weekday** date and a **time slot**
2. Check `cloud@clouddropdesigns.com` for the notification email (no `.ics` attachment)
3. Open Google Calendar as `cloud@clouddropdesigns.com`
4. Confirm a new **Inquiries** calendar exists (created automatically on first booking)
5. Confirm the event appears with the visitor invited
6. Check the visitor’s inbox for a Google Calendar invitation email

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Email sends, no calendar event | `GOOGLE_SERVICE_ACCOUNT_JSON` missing or invalid JSON |
| `unauthorized_client` or `delegation denied` | Domain-wide delegation not set, wrong Client ID, or wrong scope |
| Event created, visitor not invited | Check visitor email; Google may delay invite delivery |
| `Calendar usage limits exceeded` | Rare at low volume; retry later |
| Deploy fails on secret | Run `firebase functions:secrets:set GOOGLE_SERVICE_ACCOUNT_JSON` first |

**Logs:** [Cloud Logging — clouddropdesigns](https://console.cloud.google.com/logs?project=clouddropdesigns) — filter for Cloud Function `api`, search `[Google Calendar]`.

---

## Code reference

| File | Purpose |
|------|---------|
| `functions-api/src/googleCalendar.js` | Service account auth, Inquiries calendar, event creation |
| `functions-api/src/inquiryRoute.js` | Calls calendar after email |
| `functions-api/index.js` | Binds `GOOGLE_SERVICE_ACCOUNT_JSON` secret |