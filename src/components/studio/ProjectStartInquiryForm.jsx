import { useEffect, useState } from 'react';
import { useGetProfessional, useSiteContact } from '../../hooks/useContent';
import {
  PROJECT_INQUIRY_SCHEDULE_HINT,
  PROJECT_INQUIRY_TIME_SLOTS,
  inquiryTimeLabel,
  isValidInquiryWeekday,
} from '../../utils/projectInquirySchedule';
import '../../styles/pages/_getProfessional.scss';

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  description: '',
  preferredDate: '',
  preferredTime: '',
  availabilityNotes: '',
  timeline: '',
  budget: '',
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const labelFor = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value;

export const buildProjectInquiryMailtoLink = (
  form,
  serviceLabel = '',
  { contact, inquiryTypes, inquiryTimelines, inquiryBudgets } = {},
) => {
  const siteContact = contact ?? { email: 'cloud@clouddropdesigns.com' };
  const types = inquiryTypes ?? [];
  const timelines = inquiryTimelines ?? [];
  const budgets = inquiryBudgets ?? [];
  const subject = encodeURIComponent(
    serviceLabel
      ? `Drop & Elevate inquiry — ${serviceLabel}`
      : `Project inquiry — ${form.name.trim()}`,
  );
  const body = encodeURIComponent(
    [
      serviceLabel ? `Service interest: ${serviceLabel}` : null,
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.company.trim() ? `Company: ${form.company.trim()}` : null,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      `Project type: ${labelFor(types, form.projectType)}`,
      `Timeline: ${labelFor(timelines, form.timeline)}`,
      form.budget ? `Budget: ${labelFor(budgets, form.budget)}` : null,
      form.preferredDate ? `Preferred date: ${form.preferredDate}` : null,
      form.preferredTime ? `Preferred time: ${inquiryTimeLabel(form.preferredTime)}` : null,
      form.availabilityNotes.trim()
        ? `Additional availability:\n${form.availabilityNotes.trim()}`
        : null,
      '',
      'Project description:',
      form.description.trim(),
    ]
      .filter(Boolean)
      .join('\n'),
  );

  return `mailto:${siteContact.email}?subject=${subject}&body=${body}`;
};

const ProjectStartInquiryForm = ({
  initialProjectType = '',
  serviceLabel = '',
  serviceDescription = '',
  titleId = 'gp-inquiry-title',
  showEmailFallback = true,
  onSubmitted,
}) => {
  const siteContact = useSiteContact();
  const { inquiryTypes, inquiryTimelines, inquiryBudgets } = useGetProfessional();
  const inquiryOptions = { contact: siteContact, inquiryTypes, inquiryTimelines, inquiryBudgets };
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    projectType: initialProjectType || '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [preferredDateError, setPreferredDateError] = useState('');

  useEffect(() => {
    setForm({
      ...EMPTY_FORM,
      projectType: initialProjectType || '',
    });
    setSubmitted(false);
    setPreferredDateError('');
  }, [initialProjectType, serviceLabel]);

  const canSend =
    form.name.trim() &&
    isValidEmail(form.email) &&
    form.projectType &&
    form.description.trim() &&
    form.timeline;

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handlePreferredDateChange = (event) => {
    const { value } = event.target;

    if (value && !isValidInquiryWeekday(value)) {
      setPreferredDateError('Please choose a weekday (Monday through Saturday).');
      setForm((current) => ({ ...current, preferredDate: '' }));
      return;
    }

    setPreferredDateError('');
    setForm((current) => ({ ...current, preferredDate: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSend) return;

    window.location.href = buildProjectInquiryMailtoLink(form, serviceLabel, inquiryOptions);
    setSubmitted(true);
    onSubmitted?.();
  };

  return (
    <div className="gp-inquiry-form-block">
      <header className="gp-inquiry-modal__header">
        <h2 id={titleId} className="gp-inquiry-modal__title">
          {serviceLabel ? 'Start your inquiry' : 'Start a project'}
        </h2>
        {serviceLabel ? <p className="gp-inquiry-modal__service-label">{serviceLabel}</p> : null}
        {serviceDescription ? (
          <p className="gp-inquiry-modal__service-description">{serviceDescription}</p>
        ) : null}
        <p className="gp-inquiry-modal__intro">
          Share your project details, goals, and availability. We will reach out to discuss and help
          your project further.
        </p>
      </header>

      {submitted ? (
        <div className="gp-inquiry-modal__confirmation" role="status">
          <p className="gp-inquiry-modal__confirmation-title">Ready to send</p>
          <p className="gp-inquiry-modal__confirmation-copy">
            Your email app should open with your project details.
            {showEmailFallback ? (
              <>
                {' '}
                If it did not, reach us at{' '}
                <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>.
              </>
            ) : null}
          </p>
          <button
            type="button"
            className="gp-inquiry-modal__submit"
            onClick={() => {
              setSubmitted(false);
              setForm({
                ...EMPTY_FORM,
                projectType: initialProjectType || '',
              });
            }}
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form className="gp-inquiry-modal__form" onSubmit={handleSubmit}>
          <label className="gp-inquiry-modal__field">
            <span className="gp-inquiry-modal__label">Your name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={updateField('name')}
              autoComplete="name"
              required
              placeholder="Full name"
            />
          </label>

          <label className="gp-inquiry-modal__field">
            <span className="gp-inquiry-modal__label">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField('email')}
              autoComplete="email"
              inputMode="email"
              required
              placeholder="you@company.com"
            />
          </label>

          <div className="gp-inquiry-modal__row">
            <label className="gp-inquiry-modal__field">
              <span className="gp-inquiry-modal__label">Company (optional)</span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={updateField('company')}
                autoComplete="organization"
                placeholder="Business or organization"
              />
            </label>

            <label className="gp-inquiry-modal__field">
              <span className="gp-inquiry-modal__label">Phone (optional)</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField('phone')}
                autoComplete="tel"
                inputMode="tel"
                placeholder="Best number to reach you"
              />
            </label>
          </div>

          <label className="gp-inquiry-modal__field">
            <span className="gp-inquiry-modal__label">Project type</span>
            <select
              name="projectType"
              value={form.projectType}
              onChange={updateField('projectType')}
              className={form.projectType ? '' : 'gp-inquiry-modal__select--placeholder'}
              required
            >
              {inquiryTypes.map((option) => (
                <option key={option.value || 'empty'} value={option.value} disabled={!option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="gp-inquiry-modal__field">
            <span className="gp-inquiry-modal__label">Project description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField('description')}
              rows={4}
              required
              placeholder="What are you building? Who is it for? What does success look like?"
            />
          </label>

          <fieldset className="gp-inquiry-modal__fieldset">
            <legend className="gp-inquiry-modal__label">Preferred time to connect</legend>
            <p className="gp-inquiry-modal__schedule-hint">{PROJECT_INQUIRY_SCHEDULE_HINT}</p>
            <div className="gp-inquiry-modal__row">
              <label className="gp-inquiry-modal__field">
                <span className="gp-inquiry-modal__sublabel">Date</span>
                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handlePreferredDateChange}
                  aria-invalid={preferredDateError ? 'true' : undefined}
                  aria-describedby={preferredDateError ? 'preferred-date-error' : undefined}
                />
                {preferredDateError ? (
                  <span id="preferred-date-error" className="gp-inquiry-modal__field-error" role="alert">
                    {preferredDateError}
                  </span>
                ) : null}
              </label>
              <label className="gp-inquiry-modal__field">
                <span className="gp-inquiry-modal__sublabel">Time</span>
                <select
                  name="preferredTime"
                  value={form.preferredTime}
                  onChange={updateField('preferredTime')}
                  className={form.preferredTime ? '' : 'gp-inquiry-modal__select--placeholder'}
                >
                  {PROJECT_INQUIRY_TIME_SLOTS.map((slot) => (
                    <option key={slot.value || 'empty'} value={slot.value} disabled={!slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="gp-inquiry-modal__field">
              <span className="gp-inquiry-modal__sublabel">
                Other times that work (include timezone)
              </span>
              <textarea
                name="availabilityNotes"
                value={form.availabilityNotes}
                onChange={updateField('availabilityNotes')}
                rows={2}
                placeholder="e.g. Weekday mornings PT, or alternate dates"
              />
            </label>
          </fieldset>

          <div className="gp-inquiry-modal__row">
            <label className="gp-inquiry-modal__field">
              <span className="gp-inquiry-modal__label">Timeline</span>
              <select
                name="timeline"
                value={form.timeline}
                onChange={updateField('timeline')}
                className={form.timeline ? '' : 'gp-inquiry-modal__select--placeholder'}
                required
              >
                {inquiryTimelines.map((option) => (
                  <option key={option.value || 'empty'} value={option.value} disabled={!option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="gp-inquiry-modal__field">
              <span className="gp-inquiry-modal__label">Budget range</span>
              <select
                name="budget"
                value={form.budget}
                onChange={updateField('budget')}
                className={form.budget ? '' : 'gp-inquiry-modal__select--placeholder'}
              >
                {inquiryBudgets.map((option) => (
                  <option key={option.value || 'empty'} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="gp-inquiry-modal__submit" disabled={!canSend}>
            Send project details
          </button>
        </form>
      )}
    </div>
  );
};

export default ProjectStartInquiryForm;