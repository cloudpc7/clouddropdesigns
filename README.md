<h1 align="center">CloudDropDesigns</h1>
<h2 align="center">Drop the Code and Elevate your Web!</h2>

<h4 align="center">Hello, I'm Paul and welcome to CloudDropdesigns!</h4>

## AWS hosting (replaces Firebase App Hosting)

The public site is a Vite SPA. The API is the Express app in `functions-api/` (same routes as before: `GET /api/content`, `GET /api/inquiry/availability`, `POST /api/inquiry`). Infrastructure lives in `aws/template.yaml` (AWS SAM, region **us-west-2**).

Firebase App Hosting is **not** required to run this stack. `firebase.json` can stay in the repo; do not use it for `/api/content` or production hosting.

### Local development

```bash
npm ci
npm ci --prefix functions-api
npm run api          # Express on http://localhost:3001 (in-memory DynamoDB + seeded content)
npm run dev          # Vite on http://localhost:5173, proxies /api to the local API
npm test             # GET /api/content + POST /api/inquiry persistence tests
```

`VITE_API_BASE` empty means same-origin. Vite proxies `/api` to `VITE_API_PROXY` (default `http://localhost:3001`). If the live content request fails, the SPA keeps the bundled `src/content/*` payload and **does not** show an error banner.

### 1. Deploy the API + tables + CloudFront

Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) and authenticate to the Cloud Drop AWS account (`aws login` / `aws configure`). Then from the repo root:

```bash
cd functions-api && npm ci && cd ..
sam build --template-file aws/template.yaml
sam deploy --template-file aws/template.yaml --config-file aws/samconfig.toml
```

Confirm the changeset when SAM prompts. First deploy creates:

- HTTP API (API Gateway) + Lambda running `functions-api`
- DynamoDB: `SiteContent` (seeded from `src/content/*` on first `GET /api/content`), `Customers`, `Inquiries` (empty customer data)
- Secrets Manager placeholder `clouddropdesigns/app` — **do not put secrets in git**
- S3 bucket + CloudFront: default behavior → S3 SPA; `api/*` → API Gateway (no cache)

Stack outputs: `ApiUrl`, `CloudFrontUrl`, `FrontendBucketName`, `AppSecretsArn`.

Optional local API (documented alternative to the in-memory store):

```bash
sam local start-api --template-file aws/template.yaml --port 3001
```

Requires the stack tables (or mocked env) if you want DynamoDB instead of the in-memory store used by `npm run api`.

### 2. Fill secrets (optional — missing secrets dry-run)

In Secrets Manager, edit `clouddropdesigns/app` (output `AppSecretsArn`):

- `TURNSTILE_SECRET_KEY`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `INQUIRY_TO_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_CALENDAR_IMPERSONATE_EMAIL`, `GOOGLE_INQUIRIES_CALENDAR_ID`

If those are empty, inquiry **still writes** Customer + Inquiry rows. Email and Google Calendar stay dry-run (HTTP 202), same as today.

### 3. Build and upload the frontend

```bash
npm ci
npm run build
aws s3 sync dist/ s3://FRONTEND_BUCKET_NAME --delete
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

Leave `VITE_API_BASE` empty when CloudFront is serving `/api/*` (same-origin). Only set `VITE_API_BASE` to `ApiUrl` if you host the SPA somewhere that cannot proxy `/api`.

Do not put AWS account IDs or keys in client code.

### 4. DNS / ACM cutover (Paul still has to click this)

This environment does **not** have AWS credentials, so production DNS for clouddropdesigns.com was **not** changed. After `sam deploy` succeeds in the Cloud Drop account:

1. In **ACM (us-east-1 only)** — CloudFront requires certificates in N. Virginia — request a public certificate for `clouddropdesigns.com` (and `www` if you use it). Choose DNS validation.
2. At the **registrar or Route 53**, add the ACM validation CNAME(s) ACM shows. Wait until the cert is **Issued**.
3. Redeploy the stack with the custom domain:

   ```bash
   sam deploy --template-file aws/template.yaml --config-file aws/samconfig.toml \
     --parameter-overrides CustomDomainName=clouddropdesigns.com AcmCertificateArn=arn:aws:acm:us-east-1:ACCOUNT:certificate/ID
   ```

4. Point DNS at CloudFront (not Firebase / Google Frontend):
   - **Route 53:** alias A / AAAA to the `CloudFrontDomainName` output.
   - **Other registrar:** CNAME (or ALIAS if offered) for `@` and `www` to `xxxx.cloudfront.net`. Apex ALIAS is required; a naked CNAME is often not supported.
5. After DNS TTL, `https://clouddropdesigns.com` should be CloudFront. `GET /api/content` should return **200 JSON** (not Google Frontend 503 HTML).
6. Leave Firebase App Hosting in place until you confirm the AWS URL; do not delete the Firebase project.

CORS on the API allows `https://clouddropdesigns.com` and `http://localhost:5173`. The stack also adds the CloudFront domain via `CORS_ORIGINS`.

### POST /api/inquiry contract

Same request/response as before. After validation (and Turnstile when configured), the API now upserts a **Customer** by email and writes an **Inquiry** row, then sends email / calendar (or dry-runs).

### Services Offered

- 💻 Website Design & Development
- 📱 Mobile Application: Cross-platform apps for iOS and Android
- 🔍 Search Engine Optimization
- 📊 Google Analytics & Ad Marketing
- 🖥️ Responsive Web Design
- 🛠️ Consulting
- 🔄 Maintenance and Updates
- 🔄 Website Redesign
- ⚖️ Legal Page Setup
- ♿ Accessibility

### Tech Stack
![Tech Stack](https://skillicons.dev/icons?i=html,css,bootstrap,sass,js,python,react,firebase,gcp,git,github,vscode)

- Frontend: HTML, CSS, Javascript, React
- Backend: Python, Firebase Functions
- Mobile: React-Native, Expo, Android, ios
- Tools: Git/Github, VSCode, Figma, Google Cloud Management Console, Firebase

### Featured Projects

[Hemet Valley Tool & Supply](https://https://hemetvalleytools.web.app/)

An e-commerce website for a power tool rental and sales business based in San Jacinto, CA.
This work-in-progress React application streamlines tool rentals, repairs, and purchases with features like:

- User account creation and secure sign-in
- Advanced search and browsing for power tools
- Intuitive rental and repair request forms
- B2B integration for business clients
- Direct purchase options with shopping cart functionality

[Entertainment Web Application](https://entertainmentwebapp-444922.web.app/login)

A movie/tv entertainment web application that provides user's capabilities to search for tv shows and movies.
Features:
- Login & Sign-up form for new and existing users
- Search and bookmark capabilities
- Resposnive Web and Mobile Design

[Sonora Tires Inc](https://sonoratiresinc.web.app)

An e-commerce web application for a tire and auto services business, making it easy for customers to find, compare, and inquire about tires for their vehicle.
Features include:
- Tire Search: Powered by a tire database API—users can quickly search and filter tires by vehicle make, model, year, size, or type
- Seamless Contact Integration: Built-in email contact form and social media links for quick inquiries, quotes, and appointments
- Responsive Design: Fully mobile-friendly experience with clean UI for browsing on any device
- Secure Backend: Firebase integration for real-time data, and hosting—managed via Google Cloud Console for reliability and scalability

<h2 align="center">Med Alliance</h2>
<img src="assets/medalliance.png" height="200" width="200"/>
A dedicated mobile application connecting medical students and professors for collaboration, mentorship, and professional growth in the healthcare field. 

Features include:

- Swipe-to-Match System: Users can swipe to connect with peers or mentors based on shared educational goals, specialties, study preferences, and skill levels
- Advanced Search: Easily find and add fellow students, professors, or study partners currently online
- Customizable Profiles: Build detailed profiles highlighting academic background, research interests, certifications, and mentorship availability
- Full Messaging Suite: Private chats, group discussions, study session scheduling, and virtual meeting coordination
- Integrated Marketplace: Shop directly in-app for essential medical supplies, scrubs, footwear, study tools, and even coffee to fuel late-night sessions

🔹 Status: Coming Soon to Android and Ios!

### About me

Seasoned IT Specialist with 10+ years of experience. I combine creativity and optimism with a commitment to providing clear, effective solutions that help clients and businesses succeed in an ever-changing technology environment. 

### 🎓 Education

<table>
  <tr>
    <td align="center">
      <strong>B.S. Information Technology</strong><br>
      University of Phoenix
    </td>
    <td align="center">
      <strong>A.S. Network Security</strong><br>
      University of Advancing Technology
    </td>
  </tr>
</table>

---

### 🏆 Certifications

<table>
  <tr>
    <td align="center">
      <strong>Nucamp Coding Bootcamp</strong>
    </td>
    <td align="center">
      <strong>CyberSecurity Certification</strong>
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/cisco/1BA0E2" height="40" alt="Cisco CCNA" /><br>
      CCNA (2019–2022)
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/comptia/0079C1" height="40" alt="CompTIA" /><br>
      CompTIA A+ & Network+
    </td>
  </tr>
</table>


<div style="display: flex; align-items: center; margin-bottom: 12px;">
  <div>Nucamp Coding Bootcamp</div>
</div>

<div style="display: flex; align-items: center; margin-bottom: 12px;">
  <div>CyberSecurity Certification</div>
</div>

<div style="display: flex; align-items: center; margin-bottom: 12px;">
  <img src="https://cdn.simpleicons.org/cisco" height="40" alt="Cisco CCNA" style="margin-right: 12px;" />
  <div>CCNA (2019–2022)</div>
</div>

<div style="display: flex; align-items: center;">
  <img src="https://cdn.simpleicons.org/comptia" height="40" alt="CompTIA" style="margin-right: 12px;" />
  <div>CompTIA A+ & Network+</div>
</div>

### 🤝 Communities I'm Part Of

I actively participate in these professional and learning communities to stay sharp, collaborate, and contribute:

<table>
  <tr>
    <td align="center">
      <img src="https://cdn.simpleicons.org/discord/5865F2" height="48" alt="Discord" /><br>
      <strong>Discord Communities</strong><br>
      Various dev & cybersecurity servers
    </td>
    <td align="center">
      <strong>Offensive Security</strong><br>
      Certified Professional community
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/cisco/1BA0E2" height="48" alt="Cisco CCNA" /><br>
      <strong>Cisco Learning Network</strong><br>
      CCNA community & forums
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/figma/F24E1E" height="48" alt="Figma" /><br>
      <strong>Figma Community</strong><br>
      Plugins, files & discussions
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/react/61DAFB" height="48" alt="Frontend" /><br>
      <strong>Frontend Developer</strong><br>
      Reddit, Slack & forums
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/codecademy/000000" height="48" alt="Codecademy" /><br>
      <strong>Codecademy</strong><br>
      Learner forums & projects
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/hackerrank/2EC866" height="48" alt="HackerRank" /><br>
      <strong>HackerRank</strong><br>
      Competitive programming & challenges
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/codewars/B1361E" height="48" alt="Codewars" /><br>
      <strong>Codewars</strong><br>
      Kata challenges & rankings
    </td>
    <td align="center">
      <img src="https://cdn.simpleicons.org/leetcode/F79F1F" height="48" alt="LeetCode" /><br>
      <strong>LeetCode</strong><br>
      Algorithm practice & discussions
    </td>
  </tr>
</table>

## 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=cloudpc7&show_icons=true&theme=github_dark)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=cloudpc7&layout=compact&theme=github_dark)

[![GitHub Streak](https://github-readme-streak-stats-eight.vercel.app/?user=cloudpc7&theme=github-dark)](https://github.com/DenverCoder1/github-readme-streak-stats)

### Contact Me

<p align="center">
  <a href="https://linkedin.com/in/paul-cloud-760358338" target="_blank">
  <img src="https://img.icons8.com/ios-filled/50/0A66C2/linkedin.png" alt="LinkedIn" width="32" height="32"/>
    </a>


  <a href="https://x.com/Paul211391" target="_blank">
    <img src="https://cdn.simpleicons.org/x/1DA1F2" height="30" alt="X"/>
  </a>

  <a href="https://www.facebook.com/" target="_blank">
    <img src="https://cdn.simpleicons.org/facebook/1877F2" height="30" alt="Facebook"/>
  </a>

  <a href="https://www.instagram.com/" target="_blank">
    <img src="https://cdn.simpleicons.org/instagram/E4405F" height="30" alt="Instagram"/>
  </a>

  <a href="https://discord.gg/" target="_blank">
    <img src="https://cdn.simpleicons.org/discord/5865F2" height="30" alt="Discord"/>
  </a>

  <a href="https://www.twitch.tv/" target="_blank">
    <img src="https://cdn.simpleicons.org/twitch/9146FF" height="30" alt="Twitch"/>
  </a>
</p>



 


