import React from 'react';
import ContactForm from './ContactForm';
import { I18nProvider } from '../i18n/react';
import type { Locale } from '../i18n/locales';

interface ContactFormAppProps {
  initialLocale?: Locale;
}

const ContactFormApp: React.FC<ContactFormAppProps> = ({ initialLocale }) => {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <ContactForm />
    </I18nProvider>
  );
};

export default ContactFormApp;
