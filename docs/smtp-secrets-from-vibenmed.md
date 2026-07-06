# SMTP Secrets — Where to Find Them (VibeNMED → CloudDropDesigns)

VibeNMED sends email through **nodemailer + SMTP**. The credentials are **not** stored in a special “SMTP” page in Google Cloud. They are stored as **Firebase Functions secrets** in **Google Cloud Secret Manager**.

| Firebase project | Google Cloud project ID | Used by |
|------------------|-------------------------|---------|
| VibeNMED | `vibenmed` | VibeNMED Cloud Functions (`functions/index.js`) |
| CloudDropDesigns | `clouddropdesigns` | Site inquiry API (`functions-api`) |

Secret names (same on both projects):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

---

## Option A — Google Cloud Console (view existing VibeNMED secrets)

### 1. Open the correct project

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Use the **project picker** (top bar) and select **`vibenmed`**.
   - Direct link: [Secret Manager for vibenmed](https://console.cloud.google.com/security/secret-manager?project=vibenmed)

### 2. Open Secret Manager

1. In the left menu, open **Security** → **Secret Manager**.
   - Or search the top bar for **Secret Manager**.
2. You should see secrets named `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`.

If you do **not** see those four secrets, VibeNMED may still be in “dry run” mode (email logged, not sent). Skip to [Create new SMTP credentials](#create-new-smtp-credentials-google-account-not-gcp) below.

### 3. View each secret value

For each secret (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`):

1. Click the secret name.
2. Open the **Versions** tab.
3. Click the latest version (usually **1** or the highest number).
4. Click **View secret value**.
5. Copy the value somewhere safe (password manager). You will need it for CloudDropDesigns.

**Expected values for Google / Gmail / Google Workspace:**

| Secret | Typical value |
|--------|----------------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `cloud@clouddropdesigns.com` (or your sending mailbox) |
| `SMTP_PASS` | 16-character **Google App Password** (not your normal login password) |

### 4. If “View secret value” is disabled

You need the **Secret Manager Secret Accessor** role (or Owner/Editor) on the `vibenmed` project.

1. **IAM & Admin** → **IAM**
2. Find your Google account
3. Confirm roles include access to Secret Manager, or ask the project owner to grant **Secret Manager Secret Accessor**

If you still cannot read `SMTP_PASS`, create a **new** App Password (see below) and use that for both projects.

---

## Option B — Firebase CLI (same secrets, often easier)

From a terminal (with Firebase CLI installed and logged in):

```bash
firebase functions:secrets:access SMTP_HOST --project vibenmed
firebase functions:secrets:access SMTP_PORT --project vibenmed
firebase functions:secrets:access SMTP_USER --project vibenmed
firebase functions:secrets:access SMTP_PASS --project vibenmed
```

List all function secrets:

```bash
firebase functions:secrets:get SMTP_HOST --project vibenmed
```

Or with `gcloud`:

```bash
gcloud secrets versions access latest --secret=SMTP_HOST --project=vibenmed
gcloud secrets versions access latest --secret=SMTP_PORT --project=vibenmed
gcloud secrets versions access latest --secret=SMTP_USER --project=vibenmed
gcloud secrets versions access latest --secret=SMTP_PASS --project=vibenmed
```

---

## Copy secrets to CloudDropDesigns (`clouddropdesigns`)

After you have the four values from VibeNMED, set them on the CloudDropDesigns Firebase project.

### Using Firebase CLI (recommended)

```bash
firebase functions:secrets:set SMTP_HOST --project clouddropdesigns
firebase functions:secrets:set SMTP_PORT --project clouddropdesigns
firebase functions:secrets:set SMTP_USER --project clouddropdesigns
firebase functions:secrets:set SMTP_PASS --project clouddropdesigns
```

Each command prompts you to paste the value. Paste the same values you copied from VibeNMED (or your new App Password).

Redeploy the API so it picks up the secrets:

```bash
firebase deploy --only functions:api --project clouddropdesigns
```

### Using Google Cloud Console (CloudDropDesigns project)

1. Switch project to **`clouddropdesigns`**.
   - [Secret Manager for clouddropdesigns](https://console.cloud.google.com/security/secret-manager?project=clouddropdesigns)
2. Click **+ Create secret** for each name: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
3. Paste the same values you use on VibeNMED.
4. Redeploy `functions:api` from CI or locally so Firebase binds the secrets to the function.

---

## Create new SMTP credentials (Google Account — not GCP)

If VibeNMED never had SMTP configured, or you cannot recover `SMTP_PASS`, create credentials here:

### 1. Google App Password (for `SMTP_PASS`)

This is created in your **Google Account**, not in Google Cloud Console.

1. Sign in as the mailbox you send from (e.g. `cloud@clouddropdesigns.com`).
2. Open [Google Account → Security](https://myaccount.google.com/security).
3. Enable **2-Step Verification** (required for app passwords).
4. Open **App passwords** (under “How you sign in to Google”).
5. Create an app password:
   - App: **Mail**
   - Device: **Other** → name it e.g. `CloudDrop SMTP`
6. Google shows a **16-character password** — that is `SMTP_PASS` (spaces optional when pasting).

### 2. SMTP host, port, and user

| Secret | Value |
|--------|--------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Full email address, e.g. `cloud@clouddropdesigns.com` |

### 3. Google Workspace note

If `cloud@clouddropdesigns.com` is **Google Workspace**:

- App passwords work the same way for the user account (unless admin disabled them).
- Admin console: [admin.google.com](https://admin.google.com) → **Security** → **Authentication** — ensure app passwords are allowed if needed.
- Sending from plus addresses like `cloud+web-inquiry@clouddropdesigns.com` still uses the same `SMTP_USER` login; Gmail delivers to the main inbox.

---

## Verify it works

### VibeNMED (already sending mail)

Trigger any feature that sends email (e.g. calendar sync to email). Check Firebase Functions logs for the `vibenmed` project if mail fails.

### CloudDropDesigns inquiry form

1. Submit the project inquiry form on the site with a test message.
2. Check inbox at `cloud@clouddropdesigns.com`.
3. If SMTP is missing, logs show `[Inquiry Email Dry Run]` instead of sending.

**Functions logs (CloudDropDesigns):**

- [Cloud Console → Logging](https://console.cloud.google.com/logs?project=clouddropdesigns)
- Filter by resource: Cloud Function `api`

---

## Quick reference — where things live

| What you need | Where to get it |
|---------------|-----------------|
| View/copy existing `SMTP_*` values | GCP **Secret Manager**, project **`vibenmed`** |
| Create new mail password | [Google Account → App passwords](https://myaccount.google.com/apppasswords) |
| Store secrets for the website | GCP **Secret Manager**, project **`clouddropdesigns`** + `firebase deploy --only functions:api` |
| SMTP code reference (VibeNMED) | `vibenmed/functions/index.js` — `getSmtpConfig()`, `sendAppEmail()` |
| SMTP code reference (website) | `clouddrop/functions-api/src/inquiryEmail.js` |

---

## Security reminders

- Never commit SMTP values to git or paste them in chat.
- Treat `SMTP_PASS` like a password; rotate it if exposed.
- Prefer Firebase secrets / Secret Manager only — not `.env` files in the repo.