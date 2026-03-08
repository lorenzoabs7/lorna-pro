import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n/react';
import type { TranslationKey } from '../i18n/translator';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

interface ContactApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  errorKey?: TranslationKey;
}

function getApiUrl(): string {
  const base =
    typeof import.meta.env !== 'undefined' ? import.meta.env.PUBLIC_CONTACT_API_URL : '';
  return base ? `${String(base).replace(/\/$/, '')}/api/contact` : '/api/contact';
}

const ContactForm: React.FC = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = useMemo(
    () => [
      { value: '', label: t('contact.form.projectType.placeholder') },
      { value: 'automation', label: t('contact.form.projectType.automation') },
      { value: 'architecture', label: t('contact.form.projectType.architecture') },
      { value: 'performance', label: t('contact.form.projectType.performance') },
      { value: 'integrations', label: t('contact.form.projectType.integrations') },
      { value: 'tools', label: t('contact.form.projectType.tools') },
      { value: 'mvp', label: t('contact.form.projectType.mvp') },
      { value: 'other', label: t('contact.form.projectType.other') }
    ],
    [t]
  );

  const budgetRanges = useMemo(
    () => [
      { value: '', label: t('contact.form.budget.placeholder') },
      { value: 'under-25k', label: t('contact.form.budget.under25') },
      { value: '25k-50k', label: t('contact.form.budget.range25to50') },
      { value: '50k-100k', label: t('contact.form.budget.range50to100') },
      { value: '100k-250k', label: t('contact.form.budget.range100to250') },
      { value: '250k-plus', label: t('contact.form.budget.above250') },
      { value: 'discuss', label: t('contact.form.budget.discuss') }
    ],
    [t]
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.validation.emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.form.validation.messageTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const raw = await response.text();
      let result: ContactApiResponse = {};
      try {
        result = raw ? (JSON.parse(raw) as ContactApiResponse) : {};
        if (typeof result === 'string') result = JSON.parse(result) as ContactApiResponse;
      } catch {
        result = {};
      }

      if (!response.ok) {
        if (result.errorKey) {
          throw new Error(t(result.errorKey));
        }
        throw new Error(result.error || t('contact.form.errors.sendFailed'));
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: '',
        honeypot: ''
      });
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : t('contact.form.errors.sendFailedRetry')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-brand-positive-signal-light/10 dark:bg-brand-positive-signal-dark/10 border border-brand-positive-signal-light/20 dark:border-brand-positive-signal-dark/20 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-brand-positive-signal-light/10 dark:bg-brand-positive-signal-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-brand-positive-signal-light dark:text-brand-positive-signal-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2">
          {t('contact.form.success.title')}
        </h3>
        <p className="text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-4">
          {t('contact.form.success.description')}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-brand-positive-signal-light dark:text-brand-positive-signal-dark hover:opacity-80 font-medium"
          type="button"
        >
          {t('contact.form.success.action')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="hidden">
        <label htmlFor="honeypot">{t('contact.form.honeypotLabel')}</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2"
        >
          {t('contact.form.fields.name.label')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors ${
            errors.name
              ? 'border-brand-critical-emphasis'
              : 'border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30'
          }`}
          placeholder={t('contact.form.fields.name.placeholder')}
          required
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-brand-critical-emphasis" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2"
        >
          {t('contact.form.fields.email.label')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors ${
            errors.email
              ? 'border-brand-critical-emphasis'
              : 'border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30'
          }`}
          placeholder={t('contact.form.fields.email.placeholder')}
          required
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-brand-critical-emphasis" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2"
        >
          {t('contact.form.fields.company.label')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors"
          placeholder={t('contact.form.fields.company.placeholder')}
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2"
        >
          {t('contact.form.fields.projectType.label')}
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors"
        >
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2"
        >
          {t('contact.form.fields.budget.label')}
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors"
        >
          {budgetRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2"
        >
          {t('contact.form.fields.message.label')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className={`w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors ${
            errors.message
              ? 'border-brand-critical-emphasis'
              : 'border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30'
          }`}
          placeholder={t('contact.form.fields.message.placeholder')}
          required
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-brand-critical-emphasis" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {errors.general && (
        <div className="bg-brand-critical-emphasis/10 dark:bg-brand-critical-emphasis/20 border border-brand-critical-emphasis/30 rounded-lg p-4">
          <p className="text-brand-critical-emphasis text-sm" role="alert">
            {errors.general}
          </p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-4 bg-brand-primary text-brand-bg-light font-semibold rounded-lg transition-all duration-200 ${
            isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:ring-offset-2 focus:ring-offset-brand-bg-light dark:focus:ring-offset-brand-bg-dark'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-bg-light"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('common.actions.sending')}
            </span>
          ) : (
            t('common.actions.sendMessage')
          )}
        </button>
      </div>

      <p className="text-xs text-brand-text-secondary-light dark:text-brand-text-secondary-dark text-center">
        {t('contact.form.privacyNote')}
      </p>
    </form>
  );
};

export default ContactForm;
