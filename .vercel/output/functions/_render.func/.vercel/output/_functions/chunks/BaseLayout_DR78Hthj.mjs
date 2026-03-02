import { d as createAstro, e as createComponent, m as maybeRenderHead, g as addAttribute, f as renderTemplate, r as renderComponent, n as renderSlot, o as renderHead, p as defineScriptVars, u as unescapeHTML } from './astro/server_9P8XkXq2.mjs';
import { c as createTranslator, a as LOCALE_COOKIE_NAME, d as detectLocaleFromAcceptLanguage, r as resolveLocale, n as normalizeLocale, p as parseCookieValue, D as DEFAULT_LOCALE, e as LOCALE_OPTIONS, b as LOCALE_STORAGE_KEY } from './translator_BjG9bXh9.mjs';
/* empty css                         */

const CONTEXT_KEY = "__i18n_context";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
function getCookieLocaleFromAstro(astro) {
  const cookieFromApi = astro?.cookies?.get?.(LOCALE_COOKIE_NAME)?.value;
  if (cookieFromApi) return cookieFromApi;
  const cookieHeader = astro?.request?.headers?.get?.("cookie");
  return parseCookieValue(cookieHeader, LOCALE_COOKIE_NAME);
}
function getQueryLocaleFromAstro(astro) {
  const q = astro?.url?.searchParams?.get?.("locale");
  return normalizeLocale(q ?? null);
}
function resolveServerLocale(astro) {
  const queryLocale = getQueryLocaleFromAstro(astro);
  if (queryLocale) return queryLocale;
  const cookieLocale = getCookieLocaleFromAstro(astro);
  const acceptLanguage = astro?.request?.headers?.get?.("accept-language") ?? null;
  const browserLocale = detectLocaleFromAcceptLanguage(acceptLanguage);
  return resolveLocale({
    cookie: cookieLocale,
    browser: browserLocale ? [browserLocale] : null,
    fallback: DEFAULT_LOCALE
  });
}
function getI18nContext(astro) {
  if (!astro?.locals) {
    const locale2 = resolveServerLocale(astro);
    return {
      locale: locale2,
      translator: createTranslator(locale2, { isDev: false })
    };
  }
  const cached = astro.locals[CONTEXT_KEY];
  if (cached) return cached;
  const locale = resolveServerLocale(astro);
  const queryLocale = getQueryLocaleFromAstro(astro);
  if (queryLocale && astro?.cookies?.set) {
    astro.cookies.set(LOCALE_COOKIE_NAME, queryLocale, {
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax"
    });
  }
  const context = {
    locale,
    translator: createTranslator(locale, { isDev: false })
  };
  astro.locals[CONTEXT_KEY] = context;
  return context;
}
function getI18n(astro) {
  const { locale, translator } = getI18nContext(astro);
  return {
    ...translator,
    locale
  };
}

const $$Astro$5 = createAstro("https://lornadev.com");
const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ThemeToggle;
  const { t } = getI18n(Astro2);
  const toggleLabel = t("theme.toggle");
  return renderTemplate`${maybeRenderHead()}<button type="button" id="theme-toggle" class="theme-toggle p-2 rounded-lg text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-primary dark:hover:text-brand-technical-accent-dark hover:bg-brand-primary/5 dark:hover:bg-brand-technical-accent-dark/10 border border-transparent hover:border-brand-primary/20 dark:hover:border-brand-technical-accent-dark/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark focus:ring-offset-2 focus:ring-offset-brand-bg-light dark:focus:ring-offset-brand-bg-dark"${addAttribute(toggleLabel, "aria-label")}${addAttribute(toggleLabel, "title")}> <span class="theme-icon-light" aria-hidden="true"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </span> <span class="theme-icon-dark hidden" aria-hidden="true"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> </span> </button> `;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/ThemeToggle.astro", void 0);

const $$Astro$4 = createAstro("https://lornadev.com");
const $$LanguageFlag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LanguageFlag;
  const { flagCode, class: className = "h-4 w-6" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(`inline-flex overflow-hidden rounded-sm border border-brand-text-secondary-light/25 dark:border-brand-text-secondary-dark/35 ${className}`, "class")} aria-hidden="true"> ${flagCode === "us" && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="24" height="16" fill="#b22234"></rect> <rect y="2" width="24" height="2" fill="#fff"></rect> <rect y="6" width="24" height="2" fill="#fff"></rect> <rect y="10" width="24" height="2" fill="#fff"></rect> <rect y="14" width="24" height="2" fill="#fff"></rect> <rect width="10.5" height="8.5" fill="#3c3b6e"></rect> </svg>`} ${flagCode === "es" && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="24" height="16" fill="#aa151b"></rect> <rect y="4" width="24" height="8" fill="#f1bf00"></rect> </svg>`} ${flagCode === "it" && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="8" height="16" fill="#009246"></rect> <rect x="8" width="8" height="16" fill="#fff"></rect> <rect x="16" width="8" height="16" fill="#ce2b37"></rect> </svg>`} ${flagCode === "de" && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="24" height="16" fill="#ffce00"></rect> <rect width="24" height="10.6" fill="#dd0000"></rect> <rect width="24" height="5.3" fill="#000"></rect> </svg>`} ${flagCode === "ru" && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="24" height="16" fill="#d52b1e"></rect> <rect width="24" height="10.6" fill="#0039a6"></rect> <rect width="24" height="5.3" fill="#fff"></rect> </svg>`} ${flagCode === "cn" && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="24" height="16" fill="#de2910"></rect> <polygon points="4.5,2 5.3,4 7.4,4 5.7,5.3 6.3,7.3 4.5,6 2.7,7.3 3.3,5.3 1.6,4 3.7,4" fill="#ffde00"></polygon> </svg>`} ${!["us", "es", "it", "de", "ru", "cn"].includes(flagCode) && renderTemplate`<svg viewBox="0 0 24 16" class="h-full w-full"> <rect width="24" height="16" fill="#6b7280"></rect> </svg>`} </span>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/LanguageFlag.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$3 = createAstro("https://lornadev.com");
const $$LanguageSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LanguageSelector;
  const { locale, t } = getI18n(Astro2);
  const currentOption = LOCALE_OPTIONS.find((option) => option.code === locale) ?? LOCALE_OPTIONS[0];
  const localeName = (localeCode) => t(`common.language.names.${localeCode}`);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<details class="relative" data-language-selector> <summary class="list-none inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-primary/25 dark:border-brand-technical-accent-dark/35 text-sm text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-primary dark:hover:text-brand-technical-accent-dark hover:bg-brand-primary/5 dark:hover:bg-brand-technical-accent-dark/10 cursor-pointer transition-colors"', "", "> ", " <span>", '</span> <svg class="h-4 w-4 opacity-75" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.18l3.71-3.95a.75.75 0 111.08 1.04l-4.25 4.52a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path> </svg> </summary> <ul class="absolute right-0 mt-2 min-w-[13rem] rounded-lg border border-brand-text-secondary-light/20 dark:border-brand-text-secondary-dark/30 bg-brand-bg-light dark:bg-brand-surface-dark p-1 shadow-xl z-50" role="listbox"', "> ", " </ul> </details> <script>\n  (() => {\n    const selector = document.querySelector('[data-language-selector]');\n    if (!selector) return;\n\n    const buttons = selector.querySelectorAll('[data-locale-option]');\n\n    buttons.forEach((button) => {\n      button.addEventListener('click', (event) => {\n        event.preventDefault();\n        const selectedLocale = button.getAttribute('data-locale-option');\n        if (!selectedLocale) return;\n\n        const url = new URL(window.location.href);\n        url.searchParams.set('locale', selectedLocale);\n        window.location.href = url.toString();\n      });\n    });\n  })();\n<\/script>"])), maybeRenderHead(), addAttribute(t("common.language.selectorAriaLabel"), "aria-label"), addAttribute(t("common.language.selectorTitle"), "title"), renderComponent($$result, "LanguageFlag", $$LanguageFlag, { "flagCode": currentOption.flagCode, "class": "h-4 w-6" }), localeName(currentOption.code), addAttribute(t("common.language.optionsAriaLabel"), "aria-label"), LOCALE_OPTIONS.map((option) => renderTemplate`<li> <button type="button" role="option"${addAttribute(option.code === locale, "aria-selected")}${addAttribute(option.code, "data-locale-option")}${addAttribute(`w-full flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${option.code === locale ? "bg-brand-primary/10 dark:bg-brand-technical-accent-dark/15 text-brand-primary dark:text-brand-technical-accent-dark" : "text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:bg-brand-primary/5 dark:hover:bg-brand-technical-accent-dark/10"}`, "class")}> <span class="inline-flex items-center gap-2"> ${renderComponent($$result, "LanguageFlag", $$LanguageFlag, { "flagCode": option.flagCode, "class": "h-4 w-6" })} <span>${localeName(option.code)}</span> </span> ${option.code === locale && renderTemplate`<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42L8.534 14.88a1 1 0 01-1.414 0L3.296 11.05a1 1 0 011.414-1.414l3.117 3.118 7.462-7.463a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg>`} </button> </li>`));
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/LanguageSelector.astro", void 0);

const $$Astro$2 = createAstro("https://lornadev.com");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { currentPath = "" } = Astro2.props;
  const { t } = getI18n(Astro2);
  const isActivePath = (path) => {
    if (path === "/") return currentPath === "/";
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };
  const links = [
    { path: "/", label: t("navigation.links.home"), active: isActivePath("/") },
    {
      path: "/solutions",
      label: t("navigation.links.solutions"),
      active: isActivePath("/solutions")
    },
    { path: "/store", label: t("navigation.links.store"), active: isActivePath("/store") },
    { path: "/about", label: t("navigation.links.about"), active: isActivePath("/about") }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="bg-brand-bg-light/95 dark:bg-brand-bg-dark/95 backdrop-blur-sm border-b-2 border-b-brand-primary dark:border-b-brand-technical-accent-dark/40 sticky top-0 z-50" role="navigation"${addAttribute(t("navigation.ariaLabel"), "aria-label")}> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <div class="flex-shrink-0"> <a href="/" class="text-xl font-bold text-brand-primary dark:text-brand-bg-light hover:opacity-90 transition-opacity"> ${t("common.brandName")} </a> </div> <div class="hidden md:flex md:items-center md:gap-3"> <div class="ml-10 flex items-baseline space-x-6"> ${links.map(({ path, label, active }) => renderTemplate`<a${addAttribute(path, "href")}${addAttribute(`px-3 py-2 text-sm font-medium transition-colors ${active ? "text-brand-primary dark:text-brand-technical-accent-dark" : "text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-primary dark:hover:text-brand-technical-accent-dark"}`, "class")}${addAttribute(active ? "page" : void 0, "aria-current")}> ${label} </a>`)} </div> ${renderComponent($$result, "LanguageSelector", $$LanguageSelector, {})} <a href="/contact" class="inline-flex items-center px-4 py-2 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light text-sm font-semibold rounded-lg hover:opacity-90 transition-colors"> ${t("navigation.cta")} </a> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} </div> <div class="md:hidden flex items-center gap-2"> ${renderComponent($$result, "LanguageSelector", $$LanguageSelector, {})} ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} <button type="button" class="mobile-menu-button bg-brand-bg-light dark:bg-brand-bg-dark p-2 rounded-md text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-primary dark:hover:text-brand-technical-accent-dark hover:bg-brand-primary/5 dark:hover:bg-brand-technical-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-technical-accent-light dark:focus:ring-brand-technical-accent-dark" aria-controls="mobile-menu" aria-expanded="false" onclick="toggleMobileMenu()"> <span class="sr-only">${t("navigation.mobileMenu.open")}</span> <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </div> <div class="mobile-menu hidden" id="mobile-menu"> <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-bg-light dark:bg-brand-bg-dark border-t border-brand-primary/30 dark:border-brand-technical-accent-dark/30"> ${links.map(({ path, label, active }) => renderTemplate`<a${addAttribute(path, "href")}${addAttribute(`block px-3 py-2 text-base font-medium ${active ? "text-brand-primary dark:text-brand-technical-accent-dark" : "text-brand-text-secondary-light dark:text-brand-text-secondary-dark hover:text-brand-primary dark:hover:text-brand-technical-accent-dark"}`, "class")}${addAttribute(active ? "page" : void 0, "aria-current")}> ${label} </a>`)} <div class="pt-3 mt-3 border-t border-brand-primary/20 dark:border-brand-technical-accent-dark/25"> <a href="/contact" class="flex items-center justify-center w-full px-4 py-3 bg-brand-primary dark:bg-brand-technical-accent-dark text-brand-bg-light text-sm font-semibold rounded-lg hover:opacity-90 transition-colors"> ${t("navigation.cta")} </a> </div> </div> </div> </nav> `;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/Navigation.astro", void 0);

const $$Astro$1 = createAstro("https://lornadev.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const { t } = getI18n(Astro2);
  return renderTemplate`${maybeRenderHead()}<footer class="bg-brand-primary text-brand-bg-light" role="contentinfo"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <div class="md:col-span-2"> <div class="mb-4"> <h3 class="text-lg font-semibold mb-2 text-brand-bg-light">${t("common.brandName")}</h3> <p class="text-brand-bg-light/85 text-sm leading-relaxed"> ${t("footer.description")} </p> </div> <div class="space-y-2 text-sm text-brand-bg-light/70"> <p>📧 ${t("footer.email")}</p> <p>🏢 ${t("footer.location")}</p> </div> </div> <div> <h4 class="text-sm font-semibold mb-4 text-brand-bg-light"> ${t("footer.sections.services")} </h4> <ul class="space-y-2 text-sm"> <li> <a href="/solutions#automation" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.services.automation")}</a> </li> <li> <a href="/solutions#architecture" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.services.architecture")}</a> </li> <li> <a href="/solutions#performance" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.services.performance")}</a> </li> <li> <a href="/solutions#integrations" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.services.integrations")}</a> </li> </ul> </div> <div> <h4 class="text-sm font-semibold mb-4 text-brand-bg-light"> ${t("footer.sections.company")} </h4> <ul class="space-y-2 text-sm"> <li> <a href="/store" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.company.store")}</a> </li> <li> <a href="/about" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.company.about")}</a> </li> <li> <a href="/insights" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.company.insights")}</a> </li> </ul> </div> </div> <div class="border-t border-brand-bg-light/20 mt-8 pt-8"> <div class="flex flex-col md:flex-row justify-between items-center"> <div class="text-sm text-brand-bg-light/70 mb-4 md:mb-0"> ${t("footer.copyright", { year: currentYear })} </div> <div class="flex space-x-6 text-sm"> <a href="/privacy" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.links.privacy")}</a> <a href="/terms" class="text-brand-bg-light/70 hover:text-brand-bg-light transition-colors">${t("footer.links.terms")}</a> </div> </div> </div> </div> </footer>`;
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://lornadev.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    image = "/og-image.jpg",
    canonicalURL = new URL(Astro2.url.pathname, Astro2.site),
    structuredData
  } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const { locale } = getI18n(Astro2);
  return renderTemplate(_b || (_b = __template(["<html", "", '> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><!-- Canonical URL --><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', "><!-- Structured Data -->", "<title>", "</title><script>(function(){", "\n      (function() {\n        var supported = ['en', 'es', 'it', 'de', 'ru', 'zh'];\n        var fallback = 'en';\n        var oneYear = 60 * 60 * 24 * 365;\n\n        function normalize(value) {\n          if (!value || typeof value !== 'string') return null;\n          var normalized = value.toLowerCase().trim().replace('_', '-');\n          if (supported.indexOf(normalized) !== -1) return normalized;\n          var base = normalized.split('-')[0];\n          return supported.indexOf(base) !== -1 ? base : null;\n        }\n\n        function readCookie(name) {\n          var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));\n          return match ? decodeURIComponent(match[1]) : null;\n        }\n\n        function detectBrowserLocale() {\n          var candidates = Array.isArray(navigator.languages) && navigator.languages.length\n            ? navigator.languages\n            : [navigator.language];\n          for (var i = 0; i < candidates.length; i += 1) {\n            var locale = normalize(candidates[i]);\n            if (locale) return locale;\n          }\n          return null;\n        }\n\n        var cookieLocale = normalize(readCookie(localeCookieName));\n        var storedLocale = null;\n        try {\n          storedLocale = normalize(localStorage.getItem(localeStorageKey));\n        } catch (_error) {\n          storedLocale = null;\n        }\n\n        var locale = cookieLocale || storedLocale || detectBrowserLocale() || fallback;\n        document.documentElement.lang = locale;\n        document.documentElement.dataset.locale = locale;\n        window.__LORNA_LOCALE__ = locale;\n        document.cookie = localeCookieName + '=' + encodeURIComponent(locale) + '; path=/; max-age=' + oneYear + '; SameSite=Lax';\n        try {\n          localStorage.setItem(localeStorageKey, locale);\n        } catch (_error) {\n          // no-op\n        }\n      })();\n    })();<\/script><script>\n      (function() {\n        var s = localStorage.getItem('theme');\n        var p = window.matchMedia('(prefers-color-scheme: dark)').matches;\n        var d = s === 'dark' || (s !== 'light' && p);\n        if (d) document.documentElement.classList.add('dark');\n        else document.documentElement.classList.remove('dark');\n      })();\n    <\/script>", '</head> <body class="bg-brand-bg-light dark:bg-brand-bg-dark text-brand-text-primary-light dark:text-brand-text-primary-dark font-sans antialiased"> ', ' <main id="main-content" role="main"> ', " </main> ", " <!-- Analytics -->  <!-- Google Analytics 4 -->   </body> </html>"])), addAttribute(locale, "lang"), addAttribute(locale, "data-locale"), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), structuredData && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(structuredData))), title, defineScriptVars({ localeCookieName: LOCALE_COOKIE_NAME, localeStorageKey: LOCALE_STORAGE_KEY }), renderHead(), renderComponent($$result, "Navigation", $$Navigation, { "currentPath": currentPath }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/yooololo/Desktop/Dev/Lorna Dev/lorna-pro/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, getI18n as g };
