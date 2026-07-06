const nodemailer = require('nodemailer');
const { buildInquiryMeetingIcs } = require('./inquiryIcs');

const PROJECT_TYPE_LABELS = {
  web: 'Web Application',
  mobile: 'Mobile Application',
  both: 'Web and Mobile',
  unsure: 'Project',
};

const PROJECT_TYPE_SLUGS = {
  web: 'web',
  mobile: 'mobile',
  both: 'web-mobile',
  unsure: 'project',
};

const TIMELINE_LABELS = {
  asap: 'As soon as possible',
  '1-3': '1–3 months',
  '3-6': '3–6 months',
  flexible: 'Flexible / exploring',
};

const BUDGET_LABELS = {
  'under-5k': 'Under $5,000',
  '5-15k': '$5,000 – $15,000',
  '15-30k': '$15,000 – $30,000',
  '30k-plus': '$30,000+',
  discuss: 'Prefer to discuss',
};

const escapeHtml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatTimeLabel = (timeValue) => {
  const [hourPart, minutePart] = timeValue.split(':').map((part) => Number(part));
  const period = hourPart >= 12 ? 'PM' : 'AM';
  const hour12 = hourPart % 12 === 0 ? 12 : hourPart % 12;
  return `${hour12}:${String(minutePart).padStart(2, '0')} ${period}`;
};

const formatDateLabel = (dateString) => {
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getSmtpConfig = () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  return {
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    isConfigured: Boolean(smtpHost && smtpUser && smtpPass),
  };
};

const buildInquiryFromAddress = (projectType) => {
  const slug = PROJECT_TYPE_SLUGS[projectType] || 'project';
  const mailbox = process.env.INQUIRY_EMAIL_MAILBOX || 'cloud';
  const domain = process.env.INQUIRY_EMAIL_DOMAIN || 'clouddropdesigns.com';
  const label = `${PROJECT_TYPE_LABELS[projectType] || 'Project'} Inquiry`;
  const address = `${mailbox}+${slug}-inquiry@${domain}`;
  return { address, label, displayFrom: `"${label}" <${address}>` };
};

const buildInquiryEmailContent = (payload) => {
  const projectTypeLabel = PROJECT_TYPE_LABELS[payload.projectType] || payload.projectType;
  const timelineLabel = TIMELINE_LABELS[payload.timeline] || payload.timeline;
  const budgetLabel = payload.budget ? BUDGET_LABELS[payload.budget] || payload.budget : null;
  const preferredWhen =
    payload.preferredDate && payload.preferredTime
      ? `${formatDateLabel(payload.preferredDate)} at ${formatTimeLabel(payload.preferredTime)} PT`
      : null;

  const textLines = [
    payload.serviceLabel ? `Service interest: ${payload.serviceLabel}` : null,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Project type: ${projectTypeLabel}`,
    `Timeline: ${timelineLabel}`,
    budgetLabel ? `Budget: ${budgetLabel}` : null,
    preferredWhen ? `Preferred time to connect: ${preferredWhen}` : null,
    payload.availabilityNotes ? `Additional availability:\n${payload.availabilityNotes}` : null,
    '',
    'Project description:',
    payload.description,
  ].filter(Boolean);

  const htmlRows = [
    ['Name', payload.name],
    ['Email', payload.email],
    payload.company ? ['Company', payload.company] : null,
    payload.phone ? ['Phone', payload.phone] : null,
    ['Project type', projectTypeLabel],
    ['Timeline', timelineLabel],
    budgetLabel ? ['Budget', budgetLabel] : null,
    preferredWhen ? ['Preferred time to connect', preferredWhen] : null,
    payload.serviceLabel ? ['Service interest', payload.serviceLabel] : null,
  ].filter(Boolean);

  const html = `
    <div style="font-family: Montserrat, Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #141414;">
      <h1 style="font-size: 20px; margin: 0 0 12px;">New ${escapeHtml(projectTypeLabel)} Inquiry</h1>
      <p style="margin: 0 0 20px; color: #4b5563;">A new project inquiry was submitted on clouddropdesigns.com.</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        ${htmlRows
          .map(
            ([label, value]) => `
          <tr>
            <th align="left" style="padding: 10px 12px; border: 1px solid #e5e7eb; background: #f8fafc; width: 34%;">${escapeHtml(label)}</th>
            <td style="padding: 10px 12px; border: 1px solid #e5e7eb;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join('')}
      </table>
      <h2 style="font-size: 16px; margin: 0 0 8px;">Project description</h2>
      <p style="margin: 0 0 16px; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(payload.description)}</p>
      ${
        payload.availabilityNotes
          ? `<h2 style="font-size: 16px; margin: 0 0 8px;">Additional availability</h2>
             <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(payload.availabilityNotes)}</p>`
          : ''
      }
    </div>
  `;

  return {
    projectTypeLabel,
    text: textLines.join('\n'),
    html,
    preferredWhen,
  };
};

const sendInquiryEmail = async (payload) => {
  const { isConfigured, smtpHost, smtpPort, smtpUser, smtpPass } = getSmtpConfig();
  const to = process.env.INQUIRY_TO_EMAIL || 'cloud@clouddropdesigns.com';
  const timezone = process.env.INQUIRY_TIMEZONE || 'America/Los_Angeles';
  const { address, label, displayFrom } = buildInquiryFromAddress(payload.projectType);
  const { projectTypeLabel, text, html, preferredWhen } = buildInquiryEmailContent(payload);
  const subject = `[${projectTypeLabel} Inquiry] ${payload.name}${
    payload.serviceLabel ? ` — ${payload.serviceLabel}` : ''
  }`;

  const attachments = [];
  if (payload.preferredDate && payload.preferredTime) {
    const icsUid = `inquiry-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@clouddropdesigns.com`;
    const icsContent = buildInquiryMeetingIcs({
      uid: icsUid,
      title: `Project inquiry — ${payload.name}`,
      description: text,
      preferredDate: payload.preferredDate,
      preferredTime: payload.preferredTime,
      timezone,
    });

    attachments.push({
      filename: 'project-inquiry-meeting.ics',
      content: icsContent,
      contentType: 'text/calendar; charset=utf-8',
    });
  }

  if (!isConfigured) {
    console.info('[Inquiry Email Dry Run]', {
      to,
      from: displayFrom,
      replyTo: payload.email,
      subject,
      preferredWhen,
      hasCalendarAttachment: attachments.length > 0,
      preview: text.slice(0, 500),
    });
    return {
      sent: false,
      dryRun: true,
      to,
      from: address,
      fromLabel: label,
      subject,
      hasCalendarAttachment: attachments.length > 0,
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: displayFrom,
    sender: smtpUser,
    replyTo: payload.email,
    to,
    subject,
    text,
    html,
    attachments,
  });

  return {
    sent: true,
    dryRun: false,
    to,
    from: address,
    fromLabel: label,
    subject,
    hasCalendarAttachment: attachments.length > 0,
  };
};

module.exports = {
  buildInquiryFromAddress,
  buildInquiryEmailContent,
  sendInquiryEmail,
};