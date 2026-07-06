# SMTP Secrets — Setup Guide (CloudDropDesigns + VibeNMED)

## You usually cannot copy Firebase-managed secrets

If the secrets in Secret Manager show as **Firebase managed** and **View secret value** is missing or empty, that is expected.

Firebase Functions secrets are **write-only** after they are saved:

- They are stored in Google Cloud Secret Manager.
- Only the **Cloud Functions runtime service account** is meant to read them at deploy/run time.
- Humans often **cannot** retrieve the value later from the console — even as project owner.
- There is nothing wrong with your account; **copying from VibeNMED is not the normal workflow**.

**What to do instead:** create **new** SMTP credentials (a new Google App Password) and **set** them on each project. You do not need the old values.

---

## What the four secrets are

| Secret | What it is | Value for Google mail |
|--------|------------|------------------------|
| `SMTP_HOST` | Mail server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | Mail server port | `587` |
| `SMTP_USER` | Login email | `cloud@clouddropdesigns.com` |
| `SMTP_PASS` | Mail password | **Google App Password** (16 characters) |

`SMTP_PASS` is **not** your normal Google password. It is created once in Google Account settings (see below). Google shows it only at creation time — same idea as Firebase secrets.

---

## Step 1 — Create a Google App Password

Do this while signed in as **`cloud@clouddropdesigns.com`** (or whichever mailbox sends mail).

1. Open [Google Account → Security](https://myaccount.google.com/security).
2. Turn on **2-Step Verification** if it is not already on (required for app passwords).
3. Open **App passwords** (under “How you sign in to Google”).  
   Direct link: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Create a password:
   - App: **Mail**
   - Device: **Other** → name it e.g. `CloudDrop SMTP 2026`
5. Copy the **16-character password** immediately — this is your new `SMTP_PASS`.  
   You will not be able to see it again; only revoke and create a new one.

**Google Workspace:** If you do not see App passwords, an admin may need to allow them: [admin.google.com](https://admin.google.com) → **Security** → **Authentication**.

---

## Step 2 — Set secrets on CloudDropDesigns (website inquiry form)

Use Firebase CLI (easiest). Run each command and paste the value when prompted:

```bash
firebase login
```

```bash
firebase functions:secrets:set SMTP_HOST --project clouddropdesigns
# paste: smtp.gmail.com

firebase functions:secrets:set SMTP_PORT --project clouddropdesigns
# paste: 587

firebase functions:secrets:set SMTP_USER --project clouddropdesigns
# paste: cloud@clouddropdesigns.com

firebase functions:secrets:set SMTP_PASS --project clouddropdesigns
# paste: your 16-character App Password (no spaces)
```

Redeploy the API (or push to `development` and let CI deploy):

```bash
cd path/to/clouddrop
firebase deploy --only functions:api --project clouddropdesigns
```

---

## Step 3 — Set the same values on VibeNMED (optional but recommended)

Use the **same** App Password so one mailbox credential serves both apps:

```bash
firebase functions:secrets:set SMTP_HOST --project vibenmed
firebase functions:secrets:set SMTP_PORT --project vibenmed
firebase functions:secrets:set SMTP_USER --project vibenmed
firebase functions:secrets:set SMTP_PASS --project vibenmed
```

Redeploy VibeNMED functions:

```bash
cd path/to/vibenmed
firebase deploy --only functions --project vibenmed
```

Setting a new value creates a **new secret version**. You still never see the old value — you are replacing it.

---

## Step 4 — Verify

### CloudDropDesigns

1. Submit a test message on the project inquiry form.
2. Check `cloud@clouddropdesigns.com`.
3. If SMTP is still missing, Cloud Functions logs show `[Inquiry Email Dry Run]` instead of sending.

Logs: [Cloud Logging — clouddropdesigns](https://console.cloud.google.com/logs?project=clouddropdesigns)

### VibeNMED

Trigger an email feature (e.g. calendar sync). Check logs: [Cloud Logging — vibenmed](https://console.cloud.google.com/logs?project=vibenmed)

---

## Alternative — Google Cloud Console (create new versions, still no read-back)

If you prefer the console over CLI, you can **add a new version** but still cannot read old values:

1. Open [Secret Manager](https://console.cloud.google.com/security/secret-manager) for project **`clouddropdesigns`**.
2. Click each `SMTP_*` secret (or create it if missing).
3. **New version** → paste the value → save.
4. Redeploy `functions:api`.

Firebase-managed labels on secrets only mean Firebase created/binds them — not that values are viewable.

---

## Why “View secret value” is missing

Common reasons:

| Reason | What it means |
|--------|----------------|
| **Firebase-managed secret** | Intended for function runtime only; UI may hide values from humans |
| **No Secret Accessor on your user** | IAM may allow deploy but not reveal payloads |
| **Org policy** | Some organizations block viewing secret payloads in console |
| **Secret was set via CLI only** | Value was never shown in console after initial `secrets:set` |

None of these block you from **setting new values**.

---

## Quick reference

| Task | Where |
|------|--------|
| Create `SMTP_PASS` | [Google App passwords](https://myaccount.google.com/apppasswords) |
| Set secrets (website) | `firebase functions:secrets:set ... --project clouddropdesigns` |
| Set secrets (VibeNMED) | `firebase functions:secrets:set ... --project vibenmed` |
| See secret **names** only | GCP Secret Manager (values usually not readable) |
| Website SMTP code | `clouddrop/functions-api/src/inquiryEmail.js` |
| VibeNMED SMTP code | `vibenmed/functions/index.js` |

---

## Security

- Do not commit secrets to git.
- If an App Password is ever exposed, revoke it in Google Account → App passwords and create a new one, then update both Firebase projects.