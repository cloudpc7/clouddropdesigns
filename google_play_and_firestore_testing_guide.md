# VibeNMed Google Play, iOS & Firestore Go-Live Setup Guide

This guide outlines the critical configuration steps required to allow external users (such as Google Play Open Testing/Production users or iOS TestFlight/App Store users) to sign in, authenticate, and successfully read/write to Firestore.

If external users are currently unable to sign in, or if Firestore is restricting their access, it is almost certainly due to one of the three architectural hurdles detailed below.

---

## 📋 Table of Contents
1. [Hurdle A: Google Cloud Console OAuth Publishing Status ("Testing" vs "Production")](#hurdle-a-google-cloud-console-oauth-publishing-status-testing-vs-production)
2. [Hurdle B: The Google Play App Signing SHA-1 Fingerprint Mismatch](#hurdle-b-the-google-play-app-signing-sha-1-fingerprint-mismatch)
3. [Hurdle C: Firestore Security Rules & Signup Cloud Functions](#hurdle-c-firestore-security-rules--signup-cloud-functions)
4. [Hurdle D: iOS App Store & TestFlight Requirements](#hurdle-d-ios-app-store--testflight-requirements)
5. [Summary Checklist for Production Rollout](#summary-checklist-for-production-rollout)

---

## Hurdle A: Google Cloud Console OAuth Publishing Status ("Testing" vs "Production")

### 🔍 The Problem
When a Google Cloud Platform (GCP) project's OAuth Consent Screen is set to **"Testing"** status, Google restricts Google Sign-In access **exclusively** to the specific emails listed under the **"Test Users"** panel in the Google Cloud Console. 

If any external user (including Open Testing users downloaded from the Play Store) attempts to sign in, they will be blocked with the following error:
> **"Access blocked: This app has not been verified yet by Google. If you are a developer, add your account to the test users list."**

### 🛠️ The Fix
To allow any user in the general public (or Open Testing track) to sign in, you must switch your GCP OAuth Status to **"In Production"**.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your **VibeNMed** project from the top dropdown.
3. Navigate to **APIs & Services** > **OAuth consent screen**.
4. Under **Publishing status**, click **Publish App** to promote it to **In Production**.
5. **Note on Verification**: Moving to production does *not* require branding verification to be completed first if your app uses non-sensitive scopes. Google will allow users to log in immediately, though they may see an "Unverified App" warning page. They can bypass this by clicking **Advanced** > **Go to clouddropdesigns.com (unsafe)**. Once Google finishes your branding verification, this warning screen will disappear entirely.

---

## Hurdle B: The Google Play App Signing SHA-1 Fingerprint Mismatch

### 🔍 The Problem
When you run a local build (via Expo/EAS), your app is signed with an upload key. However, when you upload your Android App Bundle (`.aab`) to the **Google Play Console**, Google Play strips away your upload signature and **re-signs** your application with Google's own **App Signing Key** before distributing it to users.

Because Google Sign-In requires the SHA-1 fingerprint of the signing key to match your Firebase configuration, **Google Sign-In will fail silently or throw a "Developer Error (API 10)"** for users who download the app from the Play Store, even if it worked perfectly during local USB debugging.

### 🛠️ The Fix
You must copy the production SHA-1 fingerprint from the Google Play Console and register it in your Firebase Console.

#### Step 1: Copy the SHA-1 from Google Play Console
1. Log in to the [Google Play Console](https://play.google.com/console/).
2. Select your **VibeNMed** application.
3. In the left-hand menu, scroll down to **Setup** > **App signing**.
4. Under the **App signing key certificate** section, find the **SHA-1 certificate fingerprint**.
5. Copy the 40-character hex string (e.g., `AB:CD:EF:...`).

#### Step 2: Add the Fingerprint to Firebase Console
1. Log in to the [Firebase Console](https://console.firebase.google.com/).
2. Click the ⚙️ gear icon next to "Project Overview" and select **Project settings**.
3. Under the **General** tab, scroll down to the **Your apps** section.
4. Select your Android app (`com.clouddropdesigns.vibenmed`).
5. Click **Add fingerprint**.
6. Paste the SHA-1 fingerprint you copied from the Google Play Console and click **Save**.

> [!NOTE]
> Adding a fingerprint on the Firebase Console updates Google's backend authentication servers in real time. **You do NOT need to recompile or rebuild your application** on EAS after adding this fingerprint. Play Store downloads will start working for Google Sign-In within 5-10 minutes.

---

## Hurdle C: Firestore Security Rules & Signup Cloud Functions

### 🔍 The Problem
If users can authenticate (sign in) successfully but see an empty screen or receive permission errors, it is likely due to Firestore's security rules or incomplete profile setup.

Your local security configuration in `firestore.rules` is highly secure:
*   **Authentication Check**: Any read or write to user sub-collections (e.g., verification docs, tickets) requires a logged-in session (`request.auth != null`).
*   **No Direct Creation**: The rules contain the line:
    ```javascript
    match /users/{userId} {
      allow create: if false; // Client SDKs are forbidden from creating user documents
    }
    ```
*   **The Catch**: Because clients are forbidden from creating their own user documents directly via the mobile app, your backend relies on a **Firebase Cloud Function (Auth Trigger)** to automatically initialize the user's Firestore profile (`/users/{userId}`) upon signup. 
*   If this Cloud Function is not deployed, is failing, or has cold start timeouts, the Firestore profile document will never be created, and the mobile app will be unable to read `/users/{userId}`, returning permission errors.

### 🛠️ The Fix
1. Ensure your Auth Trigger Cloud Function is deployed. If needed, deploy your functions via the terminal:
   ```powershell
   firebase deploy --only functions
   ```
2. Go to the [Firebase Console](https://console.firebase.google.com/) > **Functions** > **Logs** tab. Check for any errors or crashes when new test users sign in.
3. Ensure that your Firestore Security Rules allow the user to read their own profile:
   ```javascript
   allow read: if request.auth != null && request.auth.uid == userId;
   ```

---

## Hurdle D: iOS App Store & TestFlight Requirements

For iOS users to successfully sign in using Google Sign-In and Apple Sign-In:

1.  **Apple Sign-In Capabilities**: Ensure that the Apple Sign-In capability is turned on in your Apple Developer Portal for the bundle ID `com.clouddropdesigns.vibenmed` and is configured in your Expo config.
2.  **OAuth Client IDs for iOS**: In the Google Cloud Console > Credentials page, ensure there is an **OAuth 2.0 Client ID for iOS** that maps exactly to your bundle identifier: `com.clouddropdesigns.vibenmed`.
3.  **REVERSED_CLIENT_ID URL Scheme**: Ensure that the `REVERSED_CLIENT_ID` (retrieved from `GoogleService-Info.plist`) is registered as a URL scheme in your app's native configuration so that the Google Sign-In web modal can redirect back to the VibeNMed app.

---

## Summary Checklist for Production Rollout

Before opening the app to public testers:

| System | Action Item | Verified |
| :--- | :--- | :---: |
| **Google Cloud** | OAuth Consent Screen status set to **"In Production"** | [ ] |
| **Google Play** | Copied **App Signing SHA-1** fingerprint | [ ] |
| **Firebase Console** | Added Play Store SHA-1 fingerprint to Android App settings | [ ] |
| **Firestore Rules** | Active rules deployed and secure (`firestore.rules`) | [ ] |
| **Cloud Functions** | Auth-triggered user document creator successfully running | [ ] |
| **Apple Developer** | Apple Sign-In capability enabled for bundle ID | [ ] |
