const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^(0[7-9]|1[0-8]):(00|30)$/;

const PROJECT_TYPES = new Set(['web', 'mobile', 'both', 'unsure']);
const TIMELINES = new Set(['asap', '1-3', '3-6', 'flexible']);
const BUDGETS = new Set(['under-5k', '5-15k', '15-30k', '30k-plus', 'discuss', '']);

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  company: 160,
  phone: 40,
  description: 4000,
  availabilityNotes: 1000,
  serviceLabel: 160,
};

const trimString = (value) => (typeof value === 'string' ? value.trim() : '');

const isValidInquiryWeekday = (dateString) => {
  const day = new Date(`${dateString}T12:00:00`).getDay();
  return day >= 1 && day <= 6;
};

const isSelectableInquiryDate = (dateString) => {
  const candidate = new Date(`${dateString}T12:00:00`);
  candidate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (candidate < today) {
    return false;
  }

  return isValidInquiryWeekday(dateString);
};

const sanitizePayload = (body = {}) => ({
  name: trimString(body.name),
  email: trimString(body.email),
  company: trimString(body.company),
  phone: trimString(body.phone),
  projectType: trimString(body.projectType),
  description: trimString(body.description),
  preferredDate: trimString(body.preferredDate),
  preferredTime: trimString(body.preferredTime),
  availabilityNotes: trimString(body.availabilityNotes),
  timeline: trimString(body.timeline),
  budget: trimString(body.budget),
  serviceLabel: trimString(body.serviceLabel),
  turnstileToken: trimString(body.turnstileToken),
});

const validateInquiryPayload = (body) => {
  const payload = sanitizePayload(body);
  const errors = [];

  if (!payload.name) {
    errors.push('Name is required.');
  } else if (payload.name.length > MAX_LENGTHS.name) {
    errors.push('Name is too long.');
  }

  if (!payload.email) {
    errors.push('Email is required.');
  } else if (!EMAIL_PATTERN.test(payload.email)) {
    errors.push('Email is invalid.');
  } else if (payload.email.length > MAX_LENGTHS.email) {
    errors.push('Email is too long.');
  }

  if (!payload.projectType || !PROJECT_TYPES.has(payload.projectType)) {
    errors.push('Project type is required.');
  }

  if (!payload.description) {
    errors.push('Project description is required.');
  } else if (payload.description.length > MAX_LENGTHS.description) {
    errors.push('Project description is too long.');
  }

  if (!payload.timeline || !TIMELINES.has(payload.timeline)) {
    errors.push('Timeline is required.');
  }

  if (payload.budget && !BUDGETS.has(payload.budget)) {
    errors.push('Budget range is invalid.');
  }

  if (payload.company.length > MAX_LENGTHS.company) {
    errors.push('Company is too long.');
  }

  if (payload.phone.length > MAX_LENGTHS.phone) {
    errors.push('Phone is too long.');
  }

  if (payload.availabilityNotes.length > MAX_LENGTHS.availabilityNotes) {
    errors.push('Availability notes are too long.');
  }

  if (payload.serviceLabel.length > MAX_LENGTHS.serviceLabel) {
    errors.push('Service label is too long.');
  }

  if (payload.preferredDate) {
    if (!DATE_PATTERN.test(payload.preferredDate) || !isSelectableInquiryDate(payload.preferredDate)) {
      errors.push('Preferred date must be a valid weekday in the future.');
    }
  }

  if (payload.preferredTime) {
    if (!TIME_PATTERN.test(payload.preferredTime)) {
      errors.push('Preferred time must be a valid 30-minute slot between 7:00 AM and 6:00 PM.');
    }
  }

  if ((payload.preferredDate && !payload.preferredTime) || (!payload.preferredDate && payload.preferredTime)) {
    errors.push('Preferred date and time must be provided together.');
  }

  if (errors.length) {
    return { ok: false, errors, payload: null };
  }

  return { ok: true, errors: [], payload };
};

module.exports = {
  MAX_LENGTHS,
  sanitizePayload,
  validateInquiryPayload,
};