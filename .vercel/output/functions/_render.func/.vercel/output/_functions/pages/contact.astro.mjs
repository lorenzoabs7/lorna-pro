import { d as createAstro, e as createComponent, r as renderComponent, f as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_9P8XkXq2.mjs';
import { g as getI18n, $ as $$BaseLayout } from '../chunks/BaseLayout_DR78Hthj.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { n as normalizeLocale, D as DEFAULT_LOCALE, L as LOCALE_CHANGE_EVENT, r as resolveLocale, a as LOCALE_COOKIE_NAME, b as LOCALE_STORAGE_KEY, p as parseCookieValue, c as createTranslator } from '../chunks/translator_BjG9bXh9.mjs';
export { renderers } from '../renderers.mjs';

let currentLocale = DEFAULT_LOCALE;
let initialized = false;
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
function getCookieLocale() {
  if (typeof document === "undefined") return null;
  return parseCookieValue(document.cookie, LOCALE_COOKIE_NAME);
}
function getStoredLocale() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}
function getBrowserLocales() {
  if (typeof navigator === "undefined") return [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    return navigator.languages;
  }
  return navigator.language ? [navigator.language] : [];
}
function persistLocale(locale) {
  if (typeof document !== "undefined") {
    document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }
  if (typeof window !== "undefined") {
    window.__LORNA_LOCALE__ = locale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
    }
  }
}
function detectClientLocale() {
  const locale = resolveLocale({
    cookie: getCookieLocale(),
    stored: getStoredLocale(),
    browser: getBrowserLocales(),
    fallback: DEFAULT_LOCALE
  });
  return locale;
}
function initializeClientLocale() {
  if (initialized) return currentLocale;
  if (typeof window !== "undefined") {
    const fromWindow = normalizeLocale(window.__LORNA_LOCALE__);
    currentLocale = fromWindow ?? detectClientLocale();
    persistLocale(currentLocale);
  }
  initialized = true;
  return currentLocale;
}
function getCurrentLocale() {
  if (!initialized) return initializeClientLocale();
  return currentLocale;
}
function setCurrentLocale(locale, options) {
  const next = normalizeLocale(locale) ?? DEFAULT_LOCALE;
  currentLocale = next;
  initialized = true;
  persistLocale(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LOCALE_CHANGE_EVENT, { detail: { locale: next } }));
  }
}
function subscribeLocaleChange(listener) {
  if (typeof window === "undefined") return () => {
  };
  const handler = (event) => {
    const detailLocale = normalizeLocale(event.detail?.locale ?? null);
    listener(detailLocale ?? getCurrentLocale());
  };
  window.addEventListener(LOCALE_CHANGE_EVENT, handler);
  return () => window.removeEventListener(LOCALE_CHANGE_EVENT, handler);
}

const I18nContext = createContext(null);
function I18nProvider({ initialLocale, children }) {
  const [locale, setLocaleState] = useState(() => initialLocale ?? getCurrentLocale());
  useEffect(() => {
    initializeClientLocale();
    const unsubscribe = subscribeLocaleChange((nextLocale) => {
      setLocaleState(nextLocale);
    });
    setLocaleState(getCurrentLocale());
    return unsubscribe;
  }, []);
  const setLocale = useCallback((nextLocale) => {
    setCurrentLocale(nextLocale);
  }, []);
  const translator = useMemo(() => createTranslator(locale), [locale]);
  const contextValue = useMemo(
    () => ({
      ...translator,
      setLocale
    }),
    [translator, setLocale]
  );
  return /* @__PURE__ */ jsx(I18nContext.Provider, { value: contextValue, children });
}
function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider.");
  }
  return context;
}

const ContactForm = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    honeypot: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const projectTypes = useMemo(
    () => [
      { value: "", label: t("contact.form.projectType.placeholder") },
      { value: "automation", label: t("contact.form.projectType.automation") },
      { value: "architecture", label: t("contact.form.projectType.architecture") },
      { value: "performance", label: t("contact.form.projectType.performance") },
      { value: "integrations", label: t("contact.form.projectType.integrations") },
      { value: "tools", label: t("contact.form.projectType.tools") },
      { value: "mvp", label: t("contact.form.projectType.mvp") },
      { value: "other", label: t("contact.form.projectType.other") }
    ],
    [t]
  );
  const budgetRanges = useMemo(
    () => [
      { value: "", label: t("contact.form.budget.placeholder") },
      { value: "under-25k", label: t("contact.form.budget.under25") },
      { value: "25k-50k", label: t("contact.form.budget.range25to50") },
      { value: "50k-100k", label: t("contact.form.budget.range50to100") },
      { value: "100k-250k", label: t("contact.form.budget.range100to250") },
      { value: "250k-plus", label: t("contact.form.budget.above250") },
      { value: "discuss", label: t("contact.form.budget.discuss") }
    ],
    [t]
  );
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.validation.nameRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("contact.form.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.form.validation.emailInvalid");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("contact.form.validation.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.form.validation.messageTooShort");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const handleSubmit = async (event) => {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errorKey) {
          throw new Error(t(result.errorKey));
        }
        throw new Error(result.error || t("contact.form.errors.sendFailed"));
      }
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
        honeypot: ""
      });
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : t("contact.form.errors.sendFailedRetry")
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-brand-positive-signal-light/10 dark:bg-brand-positive-signal-dark/10 border border-brand-positive-signal-light/20 dark:border-brand-positive-signal-dark/20 rounded-lg p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-brand-positive-signal-light/10 dark:bg-brand-positive-signal-dark/10 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-8 h-8 text-brand-positive-signal-light dark:text-brand-positive-signal-dark",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" })
        }
      ) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2", children: t("contact.form.success.title") }),
      /* @__PURE__ */ jsx("p", { className: "text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-4", children: t("contact.form.success.description") }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsSubmitted(false),
          className: "text-brand-positive-signal-light dark:text-brand-positive-signal-dark hover:opacity-80 font-medium",
          type: "button",
          children: t("contact.form.success.action")
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "honeypot", children: t("contact.form.honeypotLabel") }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "honeypot",
          name: "honeypot",
          value: formData.honeypot,
          onChange: handleInputChange,
          tabIndex: -1,
          autoComplete: "off"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "name",
          className: "block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2",
          children: t("contact.form.fields.name.label")
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "name",
          name: "name",
          value: formData.name,
          onChange: handleInputChange,
          className: `w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors ${errors.name ? "border-brand-critical-emphasis" : "border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30"}`,
          placeholder: t("contact.form.fields.name.placeholder"),
          required: true,
          "aria-describedby": errors.name ? "name-error" : void 0
        }
      ),
      errors.name && /* @__PURE__ */ jsx("p", { id: "name-error", className: "mt-1 text-sm text-brand-critical-emphasis", role: "alert", children: errors.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2",
          children: t("contact.form.fields.email.label")
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          id: "email",
          name: "email",
          value: formData.email,
          onChange: handleInputChange,
          className: `w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors ${errors.email ? "border-brand-critical-emphasis" : "border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30"}`,
          placeholder: t("contact.form.fields.email.placeholder"),
          required: true,
          "aria-describedby": errors.email ? "email-error" : void 0
        }
      ),
      errors.email && /* @__PURE__ */ jsx("p", { id: "email-error", className: "mt-1 text-sm text-brand-critical-emphasis", role: "alert", children: errors.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "company",
          className: "block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2",
          children: t("contact.form.fields.company.label")
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "company",
          name: "company",
          value: formData.company,
          onChange: handleInputChange,
          className: "w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors",
          placeholder: t("contact.form.fields.company.placeholder")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "projectType",
          className: "block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2",
          children: t("contact.form.fields.projectType.label")
        }
      ),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: "projectType",
          name: "projectType",
          value: formData.projectType,
          onChange: handleInputChange,
          className: "w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors",
          children: projectTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type.value, children: type.label }, type.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "budget",
          className: "block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2",
          children: t("contact.form.fields.budget.label")
        }
      ),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: "budget",
          name: "budget",
          value: formData.budget,
          onChange: handleInputChange,
          className: "w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30 rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors",
          children: budgetRanges.map((range) => /* @__PURE__ */ jsx("option", { value: range.value, children: range.label }, range.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "message",
          className: "block text-sm font-medium text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2",
          children: t("contact.form.fields.message.label")
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "message",
          name: "message",
          value: formData.message,
          onChange: handleInputChange,
          rows: 6,
          className: `w-full px-4 py-3 bg-brand-bg-light dark:bg-brand-bg-dark border rounded-lg focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:border-transparent transition-colors ${errors.message ? "border-brand-critical-emphasis" : "border-brand-text-secondary-light/30 dark:border-brand-text-secondary-dark/30"}`,
          placeholder: t("contact.form.fields.message.placeholder"),
          required: true,
          "aria-describedby": errors.message ? "message-error" : void 0
        }
      ),
      errors.message && /* @__PURE__ */ jsx("p", { id: "message-error", className: "mt-1 text-sm text-brand-critical-emphasis", role: "alert", children: errors.message })
    ] }),
    errors.general && /* @__PURE__ */ jsx("div", { className: "bg-brand-critical-emphasis/10 dark:bg-brand-critical-emphasis/20 border border-brand-critical-emphasis/30 rounded-lg p-4", children: /* @__PURE__ */ jsx("p", { className: "text-brand-critical-emphasis text-sm", role: "alert", children: errors.general }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: `w-full px-8 py-4 bg-brand-primary text-brand-bg-light font-semibold rounded-lg transition-all duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:ring-offset-2 focus:ring-offset-brand-bg-light dark:focus:ring-offset-brand-bg-dark"}`,
        children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "animate-spin -ml-1 mr-3 h-5 w-5 text-brand-bg-light",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ]
            }
          ),
          t("common.actions.sending")
        ] }) : t("common.actions.sendMessage")
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-brand-text-secondary-light dark:text-brand-text-secondary-dark text-center", children: t("contact.form.privacyNote") })
  ] });
};

const ContactFormApp = ({ initialLocale }) => {
  return /* @__PURE__ */ jsx(I18nProvider, { initialLocale, children: /* @__PURE__ */ jsx(ContactForm, {}) });
};

const $$Astro = createAstro("https://lornadev.com");
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const { t, locale } = getI18n(Astro2);
  const contactEmail = t("footer.email");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${t("navigation.cta")} | ${t("common.brandName")}`,
    description: t("contact.meta.description"),
    mainEntity: {
      "@type": "Organization",
      name: t("common.brandName"),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "hello@lornadev.com",
        availableLanguage: "English"
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": t("contact.meta.title"), "description": t("contact.meta.description"), "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-brand-bg-light dark:bg-brand-bg-dark py-20 lg:py-32"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center"> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-6 leading-tight"> ${t("contact.hero.titlePrefix")} <span class="text-brand-primary dark:text-brand-technical-accent-dark">${t("contact.hero.titleHighlight")}</span> </h1> <p class="text-xl sm:text-2xl text-brand-text-secondary-light dark:text-brand-text-secondary-dark mb-8 leading-relaxed"> ${t("contact.hero.description")} </p> </div> </div> </section> <section class="py-20 bg-brand-surface-light dark:bg-brand-surface-dark"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-12"> <div class="lg:col-span-1"> <h2 class="text-2xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-6">${t("contact.sidebar.title")}</h2> <div class="space-y-6"> <div> <h3 class="text-lg font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2">${t("contact.sidebar.responseTime.title")}</h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t("contact.sidebar.responseTime.description")} </p> </div> <div> <h3 class="text-lg font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2">${t("contact.sidebar.expectations.title")}</h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t("contact.sidebar.expectations.description")} </p> </div> <div> <h3 class="text-lg font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-2">${t("contact.sidebar.noPressure.title")}</h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t("contact.sidebar.noPressure.description")} </p> </div> <div class="pt-6 border-t border-brand-primary/15 dark:border-brand-primary/20"> <p class="text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark"> ${t("contact.sidebar.directEmail")}${" "} <a${addAttribute(`mailto:${contactEmail}`, "href")} class="text-brand-primary dark:text-brand-technical-accent-dark hover:underline"> ${contactEmail} </a> </p> </div> </div> </div> <div class="lg:col-span-2"> ${renderComponent($$result2, "ContactFormApp", ContactFormApp, { "client:load": true, "initialLocale": locale, "client:component-hydration": "load", "client:component-path": "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/ContactFormApp", "client:component-export": "default" })} </div> </div> </div> </section> <section class="py-20 bg-brand-bg-light dark:bg-brand-bg-dark"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center mb-12"> <h2 class="text-2xl font-bold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-4">${t("contact.faq.title")}</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> ${["cost", "remote", "timeline", "support"].map((item) => renderTemplate`<div class="bg-brand-surface-light dark:bg-brand-surface-dark p-6 rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/20"> <h3 class="text-lg font-semibold text-brand-text-primary-light dark:text-brand-text-primary-dark mb-3">${t(`contact.faq.items.${item}.question`)}</h3> <p class="text-brand-text-secondary-light dark:text-brand-text-secondary-dark text-sm leading-relaxed"> ${t(`contact.faq.items.${item}.answer`)} </p> </div>`)} </div> </div> </section> ` })}`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/contact.astro", void 0);

const $$file = "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
