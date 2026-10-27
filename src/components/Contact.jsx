import React, { useState } from 'react';
import { Mail, Linkedin, Github, CheckCircle2, AlertTriangle } from 'lucide-react';

const CONTACT_ENDPOINT_URL = '/api/inquiry'; // Configurable endpoint constant

export default function Contact({ t, selectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectScope: selectedService || '',
    details: '',
    website_hp: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // Keep selectedService in sync if user clicked "Ask about this"
  React.useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, projectScope: selectedService }));
    }
  }, [selectedService]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = t.contact.nameLabel + ' is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = t.contact.emailLabel + ' invalid';
    }
    if (!formData.projectScope) {
      errs.projectScope = t.contact.projectScopeLabel + ' required';
    }
    if (!formData.details.trim() || formData.details.trim().length < 10) {
      errs.details = t.contact.detailsLabel + ' (min 10 chars)';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot
    if (formData.website_hp) {
      console.warn('Bot detected via honeypot');
      setStatus('success');
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      // Attempt endpoint post
      const res = await fetch(CONTACT_ENDPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectScope: formData.projectScope,
          details: formData.details,
        }),
      });

      if (!res.ok) {
        throw new Error('Endpoint submission returned ' + res.status);
      }
      setStatus('success');
    } catch {
      // Instant fallback to direct mailto window
      const subject = encodeURIComponent(`Project Inquiry [${formData.projectScope}]: ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.projectScope}\n\nProject Specifications:\n${formData.details}`
      );
      window.location.href = `mailto:msenderovsky@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="blueprint-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="landmark-badge">
          {t.contact.landmark}
        </div>

        <div className="section-header">
          <span className="module-code">{t.contact.moduleCode}</span>
          <h2 id="contact-title" className="section-title">
            {t.contact.title}
          </h2>
          <p className="section-lead">
            {t.contact.lead}
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Channels */}
          <div className="direct-channels-card">
            <div>
              <div className="channels-title">
                {t.contact.directChannelsTitle}
              </div>
              <ul className="channels-list">
                <li className="channel-item">
                  <Mail size={16} aria-hidden="true" />
                  <a href={`mailto:${t.contact.emailDirect}`}>
                    {t.contact.emailDirect}
                  </a>
                </li>
                <li className="channel-item">
                  <Linkedin size={16} aria-hidden="true" />
                  <a href={t.contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/msenderovsky
                  </a>
                </li>
                <li className="channel-item">
                  <Github size={16} aria-hidden="true" />
                  <a href={t.contact.githubUrl} target="_blank" rel="noopener noreferrer">
                    github.com/msenderovsky
                  </a>
                </li>
              </ul>
            </div>

            <div className="channels-notice">
              {t.contact.channelsNotice}
            </div>
          </div>

          {/* Lead Inquiry Form */}
          <div className="inquiry-form-card">
            <div className="form-header-row">
              <span className="form-legend-tag">{t.contact.formLegend}</span>
              <span className="form-req-tag">{t.contact.formFieldsRequired}</span>
            </div>

            {status === 'success' && (
              <div className="form-feedback-alert success" role="alert" aria-live="polite">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <strong>State Preview (Success):</strong>
                </div>
                {t.contact.feedbackSuccess}
              </div>
            )}

            {status === 'error' && (
              <div className="form-feedback-alert error" role="alert" aria-live="assertive">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <AlertTriangle size={16} aria-hidden="true" />
                  <strong>State Preview (Error):</strong>
                </div>
                {t.contact.feedbackError}
              </div>
            )}

            <form id="lead_inquiry" onSubmit={handleSubmit} noValidate>
              {/* Honeypot field for bot protection */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="website_hp">{t.contact.honeypotLabel}</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="form_name">{t.contact.nameLabel}</label>
                <input
                  type="text"
                  id="form_name"
                  name="name"
                  required
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <div id="name-error" className="form-error-msg" role="alert">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form_email">{t.contact.emailLabel}</label>
                <input
                  type="email"
                  id="form_email"
                  name="email"
                  required
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <div id="email-error" className="form-error-msg" role="alert">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form_scope">{t.contact.projectScopeLabel}</label>
                <select
                  id="form_scope"
                  name="projectScope"
                  required
                  value={formData.projectScope}
                  onChange={handleChange}
                  aria-invalid={!!errors.projectScope}
                  aria-describedby={errors.projectScope ? 'scope-error' : undefined}
                >
                  {t.contact.projectScopeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.projectScope && (
                  <div id="scope-error" className="form-error-msg" role="alert">
                    {errors.projectScope}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="form_details">{t.contact.detailsLabel}</label>
                <textarea
                  id="form_details"
                  name="details"
                  rows={4}
                  required
                  placeholder={t.contact.detailsPlaceholder}
                  value={formData.details}
                  onChange={handleChange}
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? 'details-error' : undefined}
                />
                {errors.details && (
                  <div id="details-error" className="form-error-msg" role="alert">
                    {errors.details}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-blueprint-primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? t.contact.sendingButton : t.contact.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
