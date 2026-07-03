# Google OAuth Consent Screen Verification Guide (VibeNMed)

This guide documents the step-by-step strategy to align your mobile app, LLC website (`clouddropdesigns.com`), and Google Cloud / Firebase settings. Following these steps will resolve Google's branding objections and ensure a successful verification.

---

## 1. Google's Requirements & Key Objections
Google's Trust & Safety team enforces strict guidelines during OAuth verification to prevent phishing and ensure transparency:
1. **Domain Consistency**: The **Home Page URL**, **Privacy Policy URL**, and **Terms of Service URL** must all reside on the *same registered top-level domain* (e.g., `clouddropdesigns.com`).
2. **Clear Application Purpose**: The home page must explicitly show the app's name (**VibeNMed**) and describe its utility to the public.
3. **Legal Link Visibility**: The home page must contain conspicuous, clickable links directly to the Privacy Policy and Terms of Service.

---

## 2. Step-by-Step Implementation

### Step 1: Create a Dedicated VibeNMed Sub-Page on Your Website
On your company website, publish a new landing page at:
*   **Target URL**: `https://clouddropdesigns.com/vibenmed`

This page will serve as your official **Application Home Page** for the store listings and Google verification.

### Step 2: Add Required Branding & Copy to the Landing Page
Your page must contain the following three elements to pass Google's review:

#### A. App Name
Ensure the exact name **VibeNMed** is featured prominently at the top of the page.

#### B. App Purpose (Template)
Add a clear description outlining the purpose of the application. Feel free to copy and adapt the template below:
> **About VibeNMed**
>
> VibeNMed is a secure and professional mobile application developed by Cloud Drop Designs LLC. It is designed to connect matched healthcare students and professionals, facilitating secure peer support, professional networking, and clinical collaboration.

#### C. Direct Legal Links
Place direct, clickable text links in the header or footer of this sub-page:
*   **Privacy Policy Link**: Pointing to `https://clouddropdesigns.com/vibenmed/privacy`
*   **Terms of Service Link**: Pointing to `https://clouddropdesigns.com/vibenmed/terms`

---

### Step 3: Host Legal Policies on Your Custom Domain
Create two clean content sub-pages on your website matching the paths above:
1.  **Privacy Policy**: `https://clouddropdesigns.com/vibenmed/privacy`
2.  **Terms of Service**: `https://clouddropdesigns.com/vibenmed/terms`

> [!TIP]
> You can retrieve the exact text and HTML formatting for your policies from the mobile app's local assets in this repository:
> *   **Privacy Policy Source**: [policy.html](file:///c:/Users/cloud/projects/vibenmed/assets/policy.html)
> *   **Terms of Service Source**: [terms.html](file:///c:/Users/cloud/projects/vibenmed/assets/terms.html)
>
> Copy the HTML code or render the text from these files directly into your website builder editor (WordPress, Webflow, Squarespace, etc.).

---

### Step 4: Update Google Cloud Console Configuration
Once your website pages are live, update your OAuth configuration to tie everything together:

1.  Log in to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Select your **VibeNMed** project from the top dropdown.
3.  Go to **APIs & Services** > **OAuth consent screen**.
4.  Click **Edit App** and input the following values under **App Information**:
    *   **Application name**: `VibeNMed`
    *   **Application home page**: `https://clouddropdesigns.com/vibenmed`
    *   **Application privacy policy link**: `https://clouddropdesigns.com/vibenmed/privacy`
    *   **Application terms of service link**: `https://clouddropdesigns.com/vibenmed/terms`
5.  In the **Authorized domains** list at the bottom, ensure you have registered:
    *   `clouddropdesigns.com`
6.  Click **Save and Continue**, then submit the app for verification.

---

## 3. Reference Summary

| Requirement Category | Your Configured Value | Verification Link Location on Homepage |
| :--- | :--- | :--- |
| **App Name** | `VibeNMed` | Displayed in title/header |
| **App Purpose** | Secure matching & networking for healthcare | Under "About VibeNMed" section |
| **Application Home Page** | `https://clouddropdesigns.com/vibenmed` | — (Primary Landing URL) |
| **Privacy Policy URL** | `https://clouddropdesigns.com/vibenmed/privacy` | Linked in landing page footer |
| **Terms of Service URL** | `https://clouddropdesigns.com/vibenmed/terms` | Linked in landing page footer |

---

## 4. Syncing the Mobile App
Once your web-hosted pages are set up and verified by Google, you can update the mobile app's configuration to link to them directly. This keeps the in-app experience synchronized with your web presence.
The URLs are defined in:
*   [legalUrls.js](file:///c:/Users/cloud/projects/vibenmed/src/config/legalUrls.js)

To update them, replace `https://vibenmed.web.app` with `https://clouddropdesigns.com/vibenmed`.
